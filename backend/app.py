from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel
import json
import os.path as osp
from typing import Union
import gc


# Prompter 클래스 정의
class Prompter:
    __slots__ = ("template", "_verbose")

    def __init__(self, template_name: str = "", verbose: bool = False):
        self._verbose = verbose
        if not template_name:
            template_name = "alpaca"
        file_name = osp.join("templates", f"{template_name}.json")
        if not osp.exists(file_name):
            raise ValueError(f"Can't read {file_name}")
        with open(file_name, encoding='utf-8') as fp:
            self.template = json.load(fp)
        if self._verbose:
            print(f"Using prompt template {template_name}: {self.template['설명']}")

    def generate_prompt(self, instruction: str, label: Union[None, str] = None) -> str:
        res = self.template["prompt_no_input"].format(instruction=instruction)
        if label:
            res = f"{res}{label}"
        if self._verbose:
            print(f"Generated prompt: {res}")
        return res

    def get_response(self, output):
        split_pattern = self.template.get("response_split", "### 응답:")
        if split_pattern in output:
            response = output.split(split_pattern)[1].strip()
            return self._remove_redundancy(response)
        else:
            print(f"Warning: '{split_pattern}' not found in output. Returning full output.")
            return self._remove_redundancy(output.strip())

    def _remove_redundancy(self, text):
        # 중복된 문장 제거
        sentences = text.split(". ")
        unique_sentences = list(dict.fromkeys(sentences))  # 중복 제거
        return ". ".join(unique_sentences).strip()


# Chatbot 클래스 정의
class Chatbot:
    def __init__(self, model_name, peft_weights_path, template_name="alpaca", verbose=False):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float16)
        self.model = PeftModel.from_pretrained(self.model, peft_weights_path)
        self.model.to("cuda")  # GPU 사용
        self.prompter = Prompter(template_name=template_name, verbose=verbose)

    def generate_response(self, instruction, additional_instruction=False):
        if additional_instruction:
            instruction = f"다음 질문에 간단히 답해주세요: {instruction}\n"
        prompt = self.prompter.generate_prompt(instruction)
        inputs = self.tokenizer(prompt, return_tensors="pt").to("cuda")
        output_tokens = self.model.generate(
            **inputs,
            max_new_tokens=150,  # 응답 길이 제한
            temperature=0.5,  # 다양성 조정
            top_k=40,  # 상위 40개 후보 고려
            top_p=0.85,  # 누적 확률 기준으로 후보 선택
            no_repeat_ngram_size=2  # 반복 제거
        )
        output = self.tokenizer.decode(output_tokens[0], skip_special_tokens=True)
        return self.prompter.get_response(output)


# Flask 애플리케이션 설정
app = Flask(__name__)
CORS(app)  # React와의 통신 허용

# 모델 및 LoRA 가중치 경로 설정
MODEL_NAME = "Bllossom/llama-3.2-Korean-Bllossom-3B"
PEFT_WEIGHTS_PATH = "./lora-alpaca"
chatbot = Chatbot(MODEL_NAME, PEFT_WEIGHTS_PATH)

# Flask API 엔드포인트
@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        # 사용자 요청에서 입력 텍스트 추출
        user_message = request.json.get('message', '')
        response = chatbot.generate_response(user_message, additional_instruction=True)

        # 응답 반환
        return jsonify({'reply': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/clear-cache', methods=['POST'])
def clear_cache():
    # GPU 메모리 캐시 비우기
    torch.cuda.empty_cache()
    gc.collect()
    return jsonify({'status': 'Cache cleared successfully!'})


if __name__ == '__main__':
    app.run(debug=True)
