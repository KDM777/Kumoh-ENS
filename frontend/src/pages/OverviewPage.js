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

function OverviewPage() {
  const { department } = useParams(); // URL에서 영어 ID 가져오기
  const departmentName = departmentNames[department]; // 영어 ID를 한글 이름으로 매핑

  // 학과별 개요 데이터
  const overviewData = {
    컴퓨터공학과: '컴퓨터공학과는 지식정보사회의 핵심학과이다. 최근 4차산업혁명과 언택트 시대가 열리면서 컴퓨터에 대한 지식(Knowledge)과 활용 기술(Skill)을 필요로하는 ‘SW 융합’, ‘AI 융합’을 통한 산업간 융합을 이끌어 나갈 학과로 더욱 주목받고 있다.',
    컴퓨터소프트웨어공학과: '컴퓨터소프트웨어공학과는 소프트웨어 개발과 시스템 설계를 중점적으로 다룹니다.',
    전자공학과: '전자공학과는 전자기술과 통신 시스템에 대한 전반적인 지식을 제공합니다.',
    수리빅데이터공학과: '수리빅데이터공학과는 데이터 분석 및 수학적 모델링을 학습합니다.',
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{departmentName} - 학과 개요</h1>
      <p>{overviewData[departmentName] || '학과 개요 정보가 없습니다.'}</p>
    </div>
  );
}

export default OverviewPage;
