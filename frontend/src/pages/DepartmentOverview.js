import React from 'react';
import { useParams } from 'react-router-dom';

function DepartmentOverview() {
  const { department } = useParams();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{department} - 학과 개요</h1>
      <p>여기에 {department} 학과에 대한 개요를 작성하세요.</p>
    </div>
  );
}

export default DepartmentOverview;
