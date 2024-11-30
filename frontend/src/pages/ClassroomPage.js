import React from 'react';
import { useParams } from 'react-router-dom';

function ClassroomPage() {
  const { department } = useParams();

  // 학과별 강의실 이미지
  const classroomImages = {
    컴퓨터공학과: "https://example.com/컴퓨터공학과-강의실.jpg",
    컴퓨터소프트웨어공학과: "https://example.com/컴퓨터소프트웨어공학과-강의실.jpg",
    전자공학과: "https://example.com/전자공학과-강의실.jpg",
    수리빅데이터공학과: "https://example.com/수리빅데이터공학과-강의실.jpg",
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{department} - 강의실</h1>
      <img
        src={classroomImages[department]}
        alt={`${department} 강의실`}
        style={{ width: '80%', border: '1px solid #ddd', borderRadius: '8px' }}
      />
    </div>
  );
}

export default ClassroomPage;
