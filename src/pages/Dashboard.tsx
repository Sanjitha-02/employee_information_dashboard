import React from 'react';
import EmployeeList from '../components/EmployeeList';
import { Employees } from '../data/Employees';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>
      <EmployeeList employees={Employees} />
    </div>
  );
};

export default Dashboard;
