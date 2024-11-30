import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BuildingPage from './pages/BuildingPage';
import DepartmentPage from './pages/DepartmentPage';
import OverviewPage from './pages/OverviewPage'; // 학과 개요 페이지
import CurriculumPage from './pages/CurriculumPage'; // 커리큘럼 페이지
import HallwayPage from './pages/HallwayPage'; // 복도 페이지
import ClassroomPage from './pages/ClassroomPage'; // 강의실 페이지
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* 홈 페이지 */}
          <Route path="/" element={<HomePage />} />
          {/* 건물 페이지 */}
          <Route path="/building/:building" element={<BuildingPage />} />
          {/* 학과 페이지 */}
          <Route path="/department/:department" element={<DepartmentPage />} />
          {/* 학과 상세 페이지 */}
          <Route path="/department/:department/overview" element={<OverviewPage />} />
          <Route path="/department/:department/curriculum" element={<CurriculumPage />} />
          <Route path="/department/:department/hallway" element={<HallwayPage />} />
          <Route path="/department/:department/classroom" element={<ClassroomPage />} />
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
