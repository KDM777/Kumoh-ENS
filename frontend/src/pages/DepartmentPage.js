import React from 'react';
import { useParams } from 'react-router-dom';
import './DepartmentPage.css'; // CSS 파일 import

// 학과별 이미지 import
import computerEngineeringImage from '../img/ce.jpg';
// 영어 ID와 한글 학과 이름 매핑
const departmentNames = {
  'computer-engineering': '컴퓨터/인공지능공학과',
  'software-engineering': '컴퓨터소프트웨어공학과',
  'electronic-engineering': '전자공학부',
  'math-bigdata': '수리빅데이터학과',
  'mechanical-engineering': '기계공학과',
  'industrial-engineering': '산업공학과',
  'english-literature': '영어영문학과',
  'business-management': '경영학과',
};


const departmentImages = {
  'computer-engineering': computerEngineeringImage,
  // 다른 학과에 맞는 이미지를 추가로 import하고 매핑하세요.
};

function DepartmentPage() {
  const { department } = useParams(); // URL에서 영어 ID 가져오기
  const departmentName = departmentNames[department]; // 한글 이름으로 매핑
  const departmentImage = departmentImages[department]; // 학과 이미지 매핑

  return (
    <div className="department-container">
      <h1 className="department-title">{departmentName}</h1> {/* 학과 이름 표시 */}
      <h2 className="department-subtitle">학과 세부 정보</h2>

      {/* 가로로 배치된 학과 정보 메뉴 */}
      <ul className="department-list">
        <li className="department-item">
          <a href={`/department/${department}/overview`} className="department-link">
            학과 개요
          </a>
        </li>
        <li className="department-item">
          <a href={`/department/${department}/curriculum`} className="department-link">
            커리큘럼
          </a>
        </li>
        <li className="department-item">
          <a href={`/department/${department}/hallway`} className="department-link">
            복도
          </a>
        </li>
        <li className="department-item">
          <a href={`/department/${department}/classroom`} className="department-link">
            강의실
          </a>
        </li>
      </ul>

      {/* 학과 이미지 */}
      {departmentImage && (
        <div className="department-image-container">
          <img
            src={departmentImage}
            alt={`${departmentName} 이미지`}
            className="department-image"
          />
        </div>
      )}
    </div>
  );
}

export default DepartmentPage;
