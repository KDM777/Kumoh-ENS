import React from 'react';
import { useParams } from 'react-router-dom';

// 영어 ID와 한글 학과 이름 매핑
const departmentNames = {
  'computer-engineering': '컴퓨터공학과',
  'software-engineering': '컴퓨터소프트웨어공학과',
  'electronic-engineering': '전자공학과',
  'math-bigdata': '수리빅데이터공학과',
  'mechanical-engineering': '기계공학과',
  'industrial-engineering': '산업공학과',
  'english-literature': '영어영문학과',
  'business-management': '경영학과',
};

function ClassroomPage() {
  const { department } = useParams(); // URL에서 영어 ID 가져오기
  const departmentName = departmentNames[department]; // 영어 ID를 한글 이름으로 매핑

  // 학과별 강의실 이미지 데이터
  const classroomImages = {
    컴퓨터공학과: 'https://kumoh-intro-media.s3.ap-southeast-2.amazonaws.com/ce_cls.mp4',
    컴퓨터소프트웨어공학과: 'https://example.com/컴퓨터소프트웨어공학과-강의실.jpg',
    전자공학과: 'https://example.com/전자공학과-강의실.jpg',
    수리빅데이터공학과: 'https://example.com/수리빅데이터공학과-강의실.jpg',
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{departmentName} - 강의실</h1>
      <video
        src={classroomImages[departmentName] || 'https://example.com/default-image.jpg'} // 기본 이미지 설정
        alt={`${departmentName} 강의실`}
        style={{ width: '80%', border: '1px solid #ddd', borderRadius: '8px' }}
      />
    </div>
  );
}

export default ClassroomPage;
