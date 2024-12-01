import React from 'react';
import { Link } from 'react-router-dom';

// 건물 ID와 이름 매핑
const buildings = [
  { id: 'digital-building', name: '디지털관' },
  { id: 'techno-building', name: '테크노관' },
  { id: 'global-building', name: '글로벌관' },
];

function HomePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>금오공과대학교 소개</h1>
      {/* 건물 링크 생성 */}
      {buildings.map((building) => (
        <Link
          key={building.id} // 영어 ID 사용
          to={`/building/${building.id}`} // URL에 영어 ID 추가
          style={{ display: 'block', margin: '20px', fontSize: '18px', textDecoration: 'none' }}
        >
          {building.name} {/* 화면에는 한글 이름 표시 */}
        </Link>
      ))}
    </div>
  );
}

export default HomePage;
