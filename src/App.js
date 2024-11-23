import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';

// 건물 목록
const buildings = ['디지털관', '테크노관', '글로벌관'];

// 홈 페이지
function HomePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>금오공과대학교 소개</h1>
      {/* 각 건물에 대한 링크 생성 */}
      {buildings.map((building) => (
        <Link
          key={building}
          to={`/building/${building}`}
          style={{ display: 'block', margin: '20px', fontSize: '18px', textDecoration: 'none' }}
        >
          {building}
        </Link>
      ))}
    </div>
  );
}

// 건물 페이지
function BuildingPage() {
  // React Router v6에서 useParams 훅으로 URL 파라미터 가져오기
  const { building } = useParams();

  // 건물에 따른 학과 목록 정의
  const departments = {
    디지털관: ['컴퓨터공학과', '컴퓨터소프트웨어공학과', '전자공학과', '수리빅데이터공학과'],
    테크노관: ['기계공학과', '산업공학과'],
    글로벌관: ['영어영문학과', '경영학과'],
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{building}</h1>
      {/* 해당 건물에 포함된 학과에 대한 링크 생성 */}
      {departments[building]?.map((department) => (
        <Link
          key={department}
          to={`/department/${department}`}
          style={{ display: 'block', margin: '20px', fontSize: '18px', textDecoration: 'none' }}
        >
          {department}
        </Link>
      ))}
    </div>
  );
}

// 학과 페이지
function DepartmentPage() {
  // React Router v6에서 useParams 훅으로 URL 파라미터 가져오기
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

// 메인 App 컴포넌트
function App() {
  return (
    <Router>
      <Routes>
        {/* 홈 페이지 라우트 */}
        <Route path="/" element={<HomePage />} />
        {/* 건물 페이지 라우트 */}
        <Route path="/building/:building" element={<BuildingPage />} />
        {/* 학과 페이지 라우트 */}
        <Route path="/department/:department" element={<DepartmentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
