from flask import Flask, request, jsonify
from flask_cors import CORS
import faiss
import numpy as np
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel
import torch
import json
import os.path as osp
from typing import Union
import gc
from sentence_transformers import SentenceTransformer
import pandas as pd


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

    def generate_prompt(self, instruction: str, context: str, label: Union[None, str] = None) -> str:
        # 문맥과 질문을 통합한 프롬프트 생성
        res = f"""
        ### 문맥:
        {context}

        ### 질문:
        {instruction}

        ### 응답:
        """
        if label:
            res = f"{res}{label}"
        if self._verbose:
            print(f"Generated prompt: {res}")
        return res

    def get_response(self, output):
        split_pattern = self.template.get("response_split", "### 응답:")
        if split_pattern in output:
            response = output.split(split_pattern)[1].strip()
            return response
        else:
            print(f"Warning: '{split_pattern}' not found in output. Returning full output.")
            return output.strip()


# 문서 저장소 정의
class DocumentStore:
    def __init__(self):
        self.model = SentenceTransformer('BAAI/bge-m3')
        self.index = None
        self.docs = []

    def add_documents(self, documents):
        self.docs.extend(documents)
        embeddings = self.model.encode(documents)
        if self.index is None:
            self.index = faiss.IndexFlatL2(embeddings.shape[1])
        self.index.add(embeddings)

    def search(self, query, top_k=3):
        query_embedding = self.model.encode([query])
        distances, indices = self.index.search(np.array(query_embedding).astype('float32'), top_k)
        results = [self.docs[i] for i in indices[0]]
        return results


# Chatbot 클래스 정의
class RAGChatbot:
    def __init__(self, model_name, peft_weights_path, template_name="alpaca", verbose=False):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float16)
        self.model = PeftModel.from_pretrained(self.model, peft_weights_path)
        self.model.to("cuda")
        self.prompter = Prompter(template_name=template_name, verbose=verbose)

    def generate_response(self, query, context):
        prompt = self.prompter.generate_prompt(instruction=query, context=context)
        inputs = self.tokenizer(prompt, return_tensors="pt").to("cuda")
        output_tokens = self.model.generate(
            **inputs,
            max_new_tokens=150, #max_new_tokens=150,
            temperature=0.5,
            top_k=40, #top_k=40
            top_p=0.85,
            no_repeat_ngram_size=3,
            eos_token_id=self.tokenizer.eos_token_id,  # 종료 토큰 설정
            pad_token_id=self.tokenizer.pad_token_id   # 패딩 토큰 설정
        )

        output = self.tokenizer.decode(output_tokens[0], skip_special_tokens=True)
        print("Model output:", output)  # 디버깅 출력
        return self.prompter.get_response(output)


# Flask 애플리케이션 설정
app = Flask(__name__)
CORS(app)

# 문서 저장소 및 Chatbot 초기화
doc_store = DocumentStore()
df = pd.read_csv('kumoh_data.csv')
doc_store.add_documents(df['text'].tolist())


MODEL_NAME = "Bllossom/llama-3.2-Korean-Bllossom-3B"
PEFT_WEIGHTS_PATH = "./lora-alpaca"
chatbot = RAGChatbot(MODEL_NAME, PEFT_WEIGHTS_PATH)

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        # 사용자 요청에서 입력 텍스트 추출
        data = request.json
        if not data or 'message' not in data:
            return jsonify({'error': 'Invalid request format. "message" field is required.'}), 400

        user_message = data['message'].strip()
        if not user_message:
            return jsonify({'error': 'Empty message provided.'}), 400

        # RAG를 위한 문서 검색
        relevant_docs = doc_store.search(user_message)
        print(relevant_docs)
        context = "\n".join(relevant_docs)

        # Chatbot 응답 생성
        response = chatbot.generate_response(user_message, context)

        return jsonify({'reply': response})
    except Exception as e:
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

@app.route('/clear-cache', methods=['POST'])
def clear_cache():
    try:
        torch.cuda.empty_cache()
        gc.collect()
        return jsonify({'status': 'Cache cleared successfully!'})
    except Exception as e:
        return jsonify({'error': f'Failed to clear cache: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
