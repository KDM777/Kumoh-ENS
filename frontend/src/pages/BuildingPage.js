import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './BuildingPage.css'; // CSS 파일 import

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
  const { building } = useParams();

  return (
    <div className="building-container">
      <h1 className="building-title">{buildingNames[building]}</h1>
      {departments[building]?.map((department) => (
        <Link
          key={department.id}
          to={`/department/${department.id}`}
          className="department-link"
        >
          {department.name}
        </Link>
      )) || <p className="no-department">학과 정보가 없습니다.</p>}
    </div>
  );
}

export default BuildingPage;
