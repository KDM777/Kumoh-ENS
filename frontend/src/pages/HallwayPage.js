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

function HallwayPage() {
  const { department } = useParams(); // URL에서 영어 ID 가져오기

  // 영어 ID를 한글 이름으로 변환
  const departmentName = departmentNames[department];

  // S3 버킷 URL 설정
  const s3BaseUrl = "https://kumoh-intro-media.s3.ap-southeast-2.amazonaws.com";
  const fileName = `${department}-hallway.mp4`; // 학과 이름을 기반으로 파일명 생성
  const fileUrl = `${s3BaseUrl}/${fileName}`; // 완전한 파일 URL

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{departmentName} - 복도</h1> {/* 한글 이름 표시 */}
      <video
        src={fileUrl}
        controls // 사용자 제어 추가 (재생, 정지, 볼륨 등)
        style={{ width: '80%', border: '1px solid #ddd', borderRadius: '8px' }}
      >
        동영상이 지원되지 않는 브라우저입니다.
      </video>
    </div>
  );
}

export default HallwayPage;
