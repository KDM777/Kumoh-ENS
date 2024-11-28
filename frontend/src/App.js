import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuildingPage from './pages/BuildingPage';
import DepartmentPage from './pages/DepartmentPage';
import DepartmentOverview from './pages/DepartmentOverview';
import DepartmentCurriculum from './pages/DepartmentCurriculum';
import DepartmentHallway from './pages/DepartmentHallway';
import DepartmentClassroom from './pages/DepartmentClassroom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/building/:building" element={<BuildingPage />} />
        <Route path="/department/:department" element={<DepartmentPage />} />
        <Route path="/department/:department/overview" element={<DepartmentOverview />} />
        <Route path="/department/:department/curriculum" element={<DepartmentCurriculum />} />
        <Route path="/department/:department/hallway" element={<DepartmentHallway />} />
        <Route path="/department/:department/classroom" element={<DepartmentClassroom />} />
      </Routes>
    </Router>
  );
}

export default App;
