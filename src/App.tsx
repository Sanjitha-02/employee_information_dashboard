import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EmployeeCharts from './pages/EmployeeCharts';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/charts" element={<EmployeeCharts />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
