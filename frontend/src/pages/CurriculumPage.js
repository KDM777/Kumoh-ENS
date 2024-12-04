import React from 'react';
import { useParams } from 'react-router-dom';

// 영어 ID와 한글 학과 이름 매핑
const departmentNames = {
  'computer-engineering': '컴퓨터공학과',
  'software-engineering': '컴퓨터소프트웨어공학과',
  'electronic-engineering': '전자공학부',
  'math-bigdata': '수리빅데이터학과',
  'mechanical-engineering': '기계공학과',
  'industrial-engineering': '산업공학과',
  'english-literature': '영어영문학과',
  'business-management': '경영학과',
};

function CurriculumPage() {
    const { department } = useParams(); // URL에서 영어 ID 가져오기
    const departmentName = departmentNames[department]; // 영어 ID를 한글 이름으로 매핑

    const s3BaseUrl = "https://kumoh-intro-media.s3.ap-southeast-2.amazonaws.com";
    const fileName = `${department}-curri.png`; // 학과 이름을 기반으로 파일명 생성
    const fileUrl = `${s3BaseUrl}/${fileName}`; // 완전한 파일 URL
    return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>{department} - 커리큘럼</h1>
        <img
        src={fileUrl}
        alt={`${department} 커리큘럼`}
        style={{ width: '80%', border: '1px solid #ddd', borderRadius: '8px' }}
        />
    </div>
    );
}

export default CurriculumPage;
