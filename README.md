# Kumoh-ENS
Kumoh National Institute of Technology Explore, Navigate School
=======
# Background
학과를 정하지 못하거나 정보를 얻고 싶은 금오공대 입학을 원하는 학생, 부모님에게 정보를 제공하기 위해 만들었습니다. 각 관별로 정보를 얻을 수 있게 카테고리화 하였습니다. 기본적으로 커리큘럼, 학과 개요, 복도, 강의실을 볼 수 있습니다. 복도와 강의실의 경우 360도 카메라로 찍은 동영상을 유튜브에 업로드해 제공하고 있습니다.
정보를 확인하다가 궁금한 점이 생긴다면 우측 아래에 있는 챗봇을 통해 질문을 할 수 있습니다.

# Installation
## Client
```
git clone https://https://github.com/KDM777/Kumoh-ENS
cd frontend
npm install
npm start
```

## Server
Kumoh-ENS 폴더에서
```
cd backend
python app.py
```
### 필요 라이브러리

```
flask_cors==5.0.0
Flask==3.1.0
torch==2.3.0
transformers==4.46.3
peft==0.13.2
huggingface-hub==0.26.2
```

## Preview 
![스크린샷 2025-01-13 161141](https://github.com/user-attachments/assets/fbc7008b-def5-42d3-84c3-96d33272bec9)
![image](https://github.com/user-attachments/assets/cef1ec2c-2ecf-47cb-90bb-2df96f02ddfd)
