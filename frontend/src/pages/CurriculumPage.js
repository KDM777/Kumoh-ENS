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

function CurriculumPage() {
  const { department } = useParams(); // URL에서 영어 ID 가져오기
  const departmentName = departmentNames[department]; // 영어 ID를 한글 이름으로 매핑

  // 학과별 커리큘럼 데이터
  const curriculumData = {
    컴퓨터공학과: ['자료구조', '운영체제', '컴퓨터 네트워크', '소프트웨어 공학'],
    컴퓨터소프트웨어공학과: ['프로그래밍 언어론', '소프트웨어 테스트', '모바일 프로그래밍'],
    전자공학과: ['전자회로', '신호처리', '마이크로컨트롤러'],
    수리빅데이터공학과: ['확률과 통계', '빅데이터 분석', '머신러닝'],
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{departmentName} - 커리큘럼</h1>
      <ul>
        {curriculumData[departmentName]?.map((course, index) => (
          <li key={index}>{course}</li>
        )) || <p>커리큘럼 정보가 없습니다.</p>}
      </ul>
    </div>
  );
}

export default CurriculumPage;
