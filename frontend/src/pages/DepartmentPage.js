import React from 'react';
import { Link, useParams } from 'react-router-dom';

function DepartmentPage() {
  const { department } = useParams();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{department}</h1>
      <h2>학과 세부 정보</h2>
      <Link to={`/department/${department}/overview`} style={{ display: 'block', margin: '20px', fontSize: '18px' }}>
        학과 개요
      </Link>
      <Link to={`/department/${department}/curriculum`} style={{ display: 'block', margin: '20px', fontSize: '18px' }}>
        커리큘럼
      </Link>
      <Link to={`/department/${department}/hallway`} style={{ display: 'block', margin: '20px', fontSize: '18px' }}>
        복도
      </Link>
      <Link to={`/department/${department}/classroom`} style={{ display: 'block', margin: '20px', fontSize: '18px' }}>
        강의실
      </Link>
    </div>
  );
}

export default DepartmentPage;