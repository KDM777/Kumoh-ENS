import React from 'react';
import { Link } from 'react-router-dom';

const buildings = ['Digital', 'Techno', 'Global'];

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

export default HomePage;