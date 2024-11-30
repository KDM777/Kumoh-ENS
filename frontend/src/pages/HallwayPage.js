import React from 'react';
import { useParams } from 'react-router-dom';

function HallwayPage() {
    const { department } = useParams();

    // 학과별 복도 이미지
    
    // const hallwayImages = {
    // 컴퓨터공학과: "https://example.com/컴퓨터공학과-복도.jpg",
    // 컴퓨터소프트웨어공학과: "https://example.com/컴퓨터소프트웨어공학과-복도.jpg",
    // 전자공학과: "https://example.com/전자공학과-복도.jpg",
    // 수리빅데이터공학과: "https://example.com/수리빅데이터공학과-복도.jpg",
    // };
    // S3 버킷 URL 설정
    const s3BaseUrl = "https://kumoh-intro-media.s3.ap-southeast-2.amazonaws.com";
    const fileName = `${department}-classroom.jpg`; // 학과 이름을 기반으로 파일명 생성
    const fileUrl = `${s3BaseUrl}/${fileName}`; // 완전한 파일 URL
    return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>{department} - 복도</h1>
        <img
        src={fileUrl}
        alt={`${department} 복도`}
        style={{ width: '80%', border: '1px solid #ddd', borderRadius: '8px' }}
        />
    </div>
    );
}

export default HallwayPage;
