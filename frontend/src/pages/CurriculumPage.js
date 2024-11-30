import React from 'react';
import { useParams } from 'react-router-dom';

function CurriculumPage() {
  const { department } = useParams();

  const curriculumData = {
    컴퓨터공학과: ["자료구조", "운영체제", "컴퓨터 네트워크", "소프트웨어 공학"],
    컴퓨터소프트웨어공학과: ["프로그래밍 언어론", "소프트웨어 테스트", "모바일 프로그래밍"],
    전자공학과: ["전자회로", "신호처리", "마이크로컨트롤러"],
    수리빅데이터공학과: ["확률과 통계", "빅데이터 분석", "머신러닝"],
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{department} - 커리큘럼</h1>
      <ul>
        {curriculumData[department]?.map((course, index) => (
          <li key={index}>{course}</li>
        )) || <p>커리큘럼 정보가 없습니다.</p>}
      </ul>
    </div>
  );
}

export default CurriculumPage; // default export
