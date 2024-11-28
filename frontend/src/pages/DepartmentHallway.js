import React from 'react';
import { useParams } from 'react-router-dom';

function DepartmentHallway() {
  const { department } = useParams();
  const s3BaseUrl = "https://kumoh-intro-media.s3.ap-southeast-2.amazonaws.com";
  const fileName = `${department}-hallway.jpg`; // S3에 업로드된 파일명 가정
  const fileUrl = `${s3BaseUrl}/${fileName}`;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{department} - 복도</h1>
      <img src={fileUrl} alt={`${department} 복도`} style={{ width: '80%', marginTop: '20px' }} />
    </div>
  );
}

export default DepartmentHallway;
