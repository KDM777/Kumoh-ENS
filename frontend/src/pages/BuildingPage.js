import React from 'react';
import { Link, useParams } from 'react-router-dom';

function BuildingPage() {
  const { building } = useParams();

  const departments = {
    디지털관: ['컴퓨터공학과', '컴퓨터소프트웨어공학과', '전자공학과', '수리빅데이터공학과'],
    테크노관: ['기계공학과', '산업공학과'],
    글로벌관: ['영어영문학과', '경영학과'],
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{building}</h1>
      {/* 해당 건물에 포함된 학과에 대한 링크 생성 */}
      {departments[building]?.map((department) => (
        <Link
          key={department}
          to={`/department/${department}`}
          style={{ display: 'block', margin: '20px', fontSize: '18px', textDecoration: 'none' }}
        >
          {department}
        </Link>
      ))}
    </div>
  );
}

export default BuildingPage;