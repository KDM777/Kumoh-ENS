import React from 'react';
import { useParams } from 'react-router-dom';

function DepartmentPage() {
  const { department } = useParams();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{department}</h1>
      {/* 학과와 관련된 비디오를 S3에서 가져와 표시 */}
      <video
        controls
        src={`https://kumoh-intro-media.s3.amazonaws.com/${department}.mp4`}
        style={{ width: '80%', marginTop: '20px' }}
      />
    </div>
  );
}

export default DepartmentPage;
