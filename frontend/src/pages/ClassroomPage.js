import React from 'react';
import { useParams } from 'react-router-dom';

// 영어 ID와 한글 학과 이름 매핑
const departmentNames = {
  'computer-engineering': '컴퓨터공학과',
  'software-engineering': '컴퓨터소프트웨어공학과',
  'electronic-engineering': '전자공학부',
  'math-bigdata': '수리빅데이터학과',
  'mechanical-engineering': '기계공학과',
  'industrial-engineering': '산업공학과',
  'english-literature': '영어영문학과',
  'business-management': '경영학과',
};

function ClassroomPage() {
  const { department } = useParams(); // URL에서 영어 ID 가져오기
  const departmentName = departmentNames[department]; // 영어 ID를 한글 이름으로 매핑

  // 학과별 강의실 이미지 데이터
  const classroomVideo = {
    컴퓨터공학과: 'https://www.youtube.com/embed/BVilSZW4ySQ',
    컴퓨터소프트웨어공학과: 'https://example.com/컴퓨터소프트웨어공학과-강의실.jpg',
    전자공학과: 'https://example.com/전자공학과-강의실.jpg',
    수리빅데이터공학과: 'https://example.com/수리빅데이터공학과-강의실.jpg',
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{departmentName} - 복도</h1>
      <iframe
        width="80%"
        height="800"
        src={classroomVideo[departmentName]} //|| 'https://example.com/default-video.mp4'} // 기본 동영상 설정
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="360 Video"
    ></iframe>
    </div>
  );
}

export default ClassroomPage;
