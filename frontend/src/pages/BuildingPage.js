import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './BuildingPage.css'; // CSS 파일 import

// 이미지 파일 import
import digitalBuildingImage from '../img/digital-building.jpg';

// 학과 데이터
const departments = {
  'digital-building': [
    { id: 'computer-engineering', name: '컴퓨터/인공지능공학과' },
    { id: 'software-engineering', name: '컴퓨터소프트웨어공학과' },
    { id: 'electronic-engineering', name: '전자공학부' },
    { id: 'math-bigdata', name: '수리빅데이터학과' },
  ],
  'techno-building': [
    { id: 'mechanical-engineering', name: '기계공학과' },
    { id: 'mechanical-system-engineering', name: '기계시스템공학부' },
    { id: 'materials-engineering', name: '신소재공학부' },
  ],
  'global-building': [
    { id: 'architecture', name: '건축학부' },
    { id: 'industrial-engineering', name: '산업공학과' },
    { id: 'polymer-engineering', name: '고분자공학과' },
    { id: 'materials-design', name: '소재디자인공학과' },
    { id: 'chemical-engineering', name: '화학공학과' },
    { id: 'environmental-engineering', name: '환경공학과' },
    { id: 'chemical-life-sciences', name: '화학생명과학과' },
    { id: 'civil-engineering', name: '토목공학과' },
    { id: 'business-management', name: '경영학과' },
  ],
};

// 건물 이름 데이터
const buildingNames = {
  'digital-building': '디지털관',
  'techno-building': '테크노관',
  'global-building': '글로벌관',
};

// 이미지 매핑
const buildingImages = {
  'digital-building': digitalBuildingImage,
  // 다른 이미지는 import 후 여기에 추가
  'techno-building': null, // 예시: import technoBuildingImage from '../img/techno-building.jpg';
  'global-building': null,
};

function BuildingPage() {
  const { building } = useParams();

  return (
    <div className="building-container">
      <h1 className="building-title">{buildingNames[building]}</h1>

      {/* 학과 목록 표시 */}
      {departments[building]?.map((department) => (
        <Link
          key={department.id}
          to={`/department/${department.id}`}
          className="department-link"
        >
          {department.name}
        </Link>
      )) || <p className="no-department">학과 정보가 없습니다.</p>}

      {/* 건물 이미지 표시 */}
      {buildingImages[building] && (
        <div className="building-image-container">
          <img
            src={buildingImages[building]} // 매핑된 이미지 경로 사용
            alt={`${buildingNames[building]} 이미지`}
            className="building-image"
          />
        </div>
      )}
    </div>
  );
}

export default BuildingPage;
