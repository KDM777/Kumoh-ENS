import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BuildingPage from './pages/BuildingPage';
import DepartmentPage from './pages/DepartmentPage';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* 홈 페이지 라우트 */}
          <Route path="/" element={<HomePage />} />
          {/* 건물 페이지 라우트 */}
          <Route path="/building/:building" element={<BuildingPage />} />
          {/* 학과 페이지 라우트 */}
          <Route path="/department/:department" element={<DepartmentPage />} />
        </Routes>
        <Chatbot /> {/* 챗봇 추가 */}
      </div>
    </Router>
  );
}

export default App;
