import torch
from transformers import LlamaForCausalLM, LlamaTokenizer
from peft import PeftModel
import json
import os.path as osp
from typing import Union


class Prompter(object):
    __slots__ = ("template", "_verbose")

    def __init__(self, template_name: str = "", verbose: bool = False):
        self._verbose = verbose
        if not template_name:
            # Enforce the default here, so the constructor can be called with '' and will not break.
            template_name = "alpaca"
        file_name = osp.join("templates", f"{template_name}.json")
        if not osp.exists(file_name):
            raise ValueError(f"Can't read {file_name}")
        with open(file_name) as fp:
            self.template = json.load(fp)
        if self._verbose:
            print(
                f"Using prompt template {template_name}: {self.template['description']}"
            )

    def generate_prompt(
        self,
        instruction: str,
  
        label: Union[None, str] = None,
    ) -> str:
        # returns the full prompt from instruction and optional input
        # if a label (=response, =output) is provided, it's also appended.
        res = self.template["prompt_no_input"].format(
                instruction=instruction
            )
        if label:
            res = f"{res}{label}"
        if self._verbose:
            print(res)
        return res

    def get_response(self, output):
        if self.template["response_split"] in output:
            return output.split(self.template["response_split"])[1].strip()
        else:
            # response_split 패턴이 없는 경우 전체 output 반환
            print(f"Warning: '{self.template['response_split']}' not found in output. Returning full output.")
            return output.strip()

class Chatbot:
    def __init__(self, model_name, peft_weights_path, template_name="alpaca", verbose=False):
        # 토크나이저 및 모델 불러오기
        self.tokenizer = LlamaTokenizer.from_pretrained(model_name)
        self.model = LlamaForCausalLM.from_pretrained(model_name, torch_dtype=torch.float16)
        
        # PEFT (LoRA) 가중치 적용
        self.model = PeftModel.from_pretrained(self.model, peft_weights_path)
        self.model.to("cuda")  # GPU를 사용할 경우

        # Prompter 클래스 생성
        self.prompter = Prompter(template_name=template_name, verbose=verbose)

    def generate_response(self, instruction, additional_instruction=None):
        # 프롬프트 생성
        if additional_instruction:
            instruction = f"다음 내용을 요약해주세요: {instruction}"
        prompt = self.prompter.generate_prompt(instruction)

        # 토큰화
        inputs = self.tokenizer(prompt, return_tensors="pt").to("cuda")
        
        # 모델에 입력 전달하여 답변 생성
        output_tokens = self.model.generate(**inputs, max_new_tokens=512)
        output = self.tokenizer.decode(output_tokens[0], skip_special_tokens=True)
        
        # 응답에서 실제 답변 부분 추출
        response = self.prompter.get_response(output)
        return response

# Prompter는 이미 제공된 코드에 기반해 설정됩니다.
# 템플릿 파일에서 "response_split" 등을 맞춰 사용합니다.

# 예시로 모델과 PEFT 가중치를 사용해 챗봇을 실행하는 코드
if __name__ == "__main__":
    # 모델과 PEFT 경로 설정
    model_name = "MLP-KTLim/llama-3-Korean-Bllossom-8B"
    peft_weights_path = "./lora-alpaca"

    # 챗봇 인스턴스 생성
    chatbot = Chatbot(model_name, peft_weights_path)

    # 사용자로부터 입력을 받아 요약 요청 실행
    user_input = "다음 내용을 요약해주세요. 내용 : 한동훈 국민의힘 대표가 2025학년도 의대 증원 문제를 포함해 모든 문제를 여야의정 협의체에서 논의할 수 있다는 뜻을 밝혔다. 더불어민주당도 11일 여야의정 협의체 구성을 위해 ‘2025학년도 의대 정원 조정 문제’까지 논의하자고 제안했다. 의료계는 일단 협상 테이블에 앉아 의료 공백 해결 방안을 논의해야 한다.한 대표는 전날 여야의정 협의체 구성과 관련해 “협의체 출범 전제 조건으로 ‘이건 안 된다’는 것은 없다”고 밝혔다. 내년도 의대 증원 재검토라는 의료계 주장까지도 일단 협의체에 들어와 얘기하자고 촉구한 것이다. 조규홍 보건복지부 장관과 박민수 제2차관 경질 요구에 대해서도 “모여서 무슨 얘긴들 못 하겠나”라고 했다. 민주당도 이날 ‘여야의정 협의체 구성을 위한 3대 요구안’으로, -2025년 의대 정원 조정 문제 논의 -합리적 추계를 통한 2026년 의대 정원 결정 -윤석열 대통령의 사과와 책임자 문책 등을 요구했다. 여야가 이처럼 같은 목소리를 내는 것은 의료계가 참여하는 협의체 출범이 시급하다는 공통된 인식을 갖고 있기 때문이다.그러나 문제는 결국 정부와 의료계가 풀어야 한다. 정부와 의료계의 간극은 전혀 줄어들지 않고 있다. 지난 2월 의대 증원 백지화를 요구하며 전공의들이 이탈한 이후, 7개월 가까이 상황을 악화시킨 정부의 무책임은 비판받아야 한다. 다만 지난 9일부터 대입 수시모집이 시작돼 현실적으로 당장 내년도 입시 정원부터 재검토하자는 주장도 무리한 게 사실이다. 의대 증원 방침에 맞춰 올해 수능을 치르는 ‘엔(n)수생’ 수가 21년 만에 최고치다. 원점 재검토 시 수험생들이 겪을 혼란과 사회적 파장은 상상하기도 힘들다. ‘의료 대란’과 ‘수험생 불편’ 중 양자택일하라는 식의 의료계 엄포는, 오만할 뿐 아니라 국민 생명을 협상 지렛대로 여기는 인식을 드러낼 뿐이다."
    response = chatbot.generate_response(user_input, additional_instruction=True)
    
    # 출력된 응답 확인
    print(f"Chatbot Response: {response}")
