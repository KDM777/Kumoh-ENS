import React from 'react';
import { Link, useParams } from 'react-router-dom';

// 영어 ID와 한글 학과 이름 매핑
const departments = {
  'digital-building': [
    { id: 'computer-engineering', name: '컴퓨터공학과' },
    { id: 'software-engineering', name: '컴퓨터소프트웨어공학과' },
    { id: 'electronic-engineering', name: '전자공학과' },
    { id: 'math-bigdata', name: '수리빅데이터공학과' },
  ],
  'techno-building': [
    { id: 'mechanical-engineering', name: '기계공학과' },
    { id: 'industrial-engineering', name: '산업공학과' },
  ],
  'global-building': [
    { id: 'english-literature', name: '영어영문학과' },
    { id: 'business-management', name: '경영학과' },
  ],
};

const buildingNames = {
  'digital-building': '디지털관',
  'techno-building': '테크노관',
  'global-building': '글로벌관',
};

function BuildingPage() {
  const { building } = useParams(); // URL에서 건물 ID 가져오기

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{buildingNames[building]}</h1> {/* 건물 이름 표시 */}
      {departments[building]?.map((department) => (
        <Link
          key={department.id} // 영어 ID 사용
          to={`/department/${department.id}`} // URL에 영어 ID 추가
          style={{ display: 'block', margin: '20px', fontSize: '18px', textDecoration: 'none' }}
        >
          {department.name} {/* 한글 학과 이름 표시 */}
        </Link>
      )) || <p>학과 정보가 없습니다.</p>}
    </div>
  );
}

export default BuildingPage;
