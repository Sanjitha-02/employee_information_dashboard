import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EmployeeCharts from "./pages/EmployeeCharts";

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-6">Welcome to Employee Dashboard</h1>

        {/* Button group - responsive */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link to="/dashboard" className="flex-1">
            <button className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full hover:bg-blue-700">
              Go to Dashboard
            </button>
          </Link>

          <Link to="/charts" className="flex-1">
            <button className="bg-green-600 text-white px-4 py-3 rounded-lg w-full hover:bg-green-700">
              View Employee Charts
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/charts" element={<EmployeeCharts />} />
      </Routes>
    </Router>
  );
};

export default App;
