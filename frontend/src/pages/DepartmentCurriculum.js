import React from 'react';
import { useParams } from 'react-router-dom';

function DepartmentCurriculum() {
  const { department } = useParams();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{department} - 커리큘럼</h1>
      <p>여기에 {department} 학과의 커리큘럼을 작성하세요.</p>
    </div>
  );
}

export default DepartmentCurriculum;
