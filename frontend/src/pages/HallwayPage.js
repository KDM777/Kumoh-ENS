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

// 학과별 복도 동영상 URL 매핑
const hallwayVideos = {
  '컴퓨터공학과': 'https://www.youtube.com/embed/iPgA7xqC3hs',
  '컴퓨터소프트웨어공학과': 'https://example.com/컴퓨터소프트웨어공학과-복도.mp4',
  '전자공학과': 'https://example.com/전자공학과-복도.mp4',
  '수리빅데이터공학과': 'https://example.com/수리빅데이터공학과-복도.mp4',
  '기계공학과': 'https://example.com/기계공학과-복도.mp4',
  '산업공학과': 'https://example.com/산업공학과-복도.mp4',
  '영어영문학과': 'https://example.com/영어영문학과-복도.mp4',
  '경영학과': 'https://example.com/경영학과-복도.mp4',
};

function HallwayPage() {
  const { department } = useParams(); // URL에서 영어 ID 가져오기
  const departmentName = departmentNames[department]; // 영어 ID를 한글 이름으로 매핑

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{departmentName} - 복도</h1>
      <iframe
        width="80%"
        height="800"
        src={hallwayVideos[departmentName]} //|| 'https://example.com/default-video.mp4'} // 기본 동영상 설정
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="360 Video"
    ></iframe>
    </div>
  );
}

export default HallwayPage;
