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

function DepartmentPage() {
  const { department } = useParams(); // URL에서 영어 ID 가져오기
  const departmentName = departmentNames[department]; // 한글 이름으로 매핑

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{departmentName}</h1> {/* 한글 학과 이름 표시 */}
      <h2>학과 세부 정보</h2>
      {/* 왼쪽 정렬을 적용한 ul */}
      <ul style={{ textAlign: 'left', display: 'inline-block', margin: '0 auto', listStyle: 'none', padding: 0 }}>
        <li>
          <a href={`/department/${department}/overview`}>학과 개요</a>
        </li>
        <li>
          <a href={`/department/${department}/curriculum`}>커리큘럼</a>
        </li>
        <li>
          <a href={`/department/${department}/hallway`}>복도</a>
        </li>
        <li>
          <a href={`/department/${department}/classroom`}>강의실</a>
        </li>
      </ul>
    </div>
  );
}

export default DepartmentPage;
