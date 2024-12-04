import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // CSS 파일 import

// 건물 데이터와 키워드 매핑
const buildings = [
  {
    id: 'digital-building',
    name: '디지털관',
    keywords: ['전자공학', '컴퓨터공학', '프로그래밍', '인공지능', '빅데이터', '소프트웨어 개발', '네트워크', '머신러닝'],
  },
  {
    id: 'techno-building',
    name: '테크노관',
    keywords: ['기계공학', '로봇공학', '신소재', '제조', '자동화', '광학', '레이저', '신소재 개발'],
  },
  {
    id: 'global-building',
    name: '글로벌관',
    keywords: ['건축', '산업공학', '화학공학', '환경', '지속 가능성', '토목공학', '소재 디자인', '생명과학', '화학생명과학', '인프라'],
  },
];

function HomePage() {
  return (
    <div className="home-container">
      {buildings.map((building) => (
        <div key={building.id} className={`building-section ${building.id}`}>
          <Link to={`/building/${building.id}`} className="building-link">
            {building.name}
          </Link>
          <div className="building-keywords">
            {building.keywords.map((keyword, index) => (
              <span key={index} className="keyword-item">
                #{keyword}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
