import React from 'react';
import { Employee } from '../interfaces/types';

interface Props {
  employees: Employee[];
}

const EmployeeList: React.FC<Props> = ({ employees }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Department</th>
            <th className="px-4 py-2 border">Experience (Years)</th>
            <th className="px-4 py-2 border">Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{emp.firstName} {emp.lastName}</td>
              <td className="px-4 py-2 border">{emp.email}</td>
              <td className="px-4 py-2 border">{emp.role.title} ({emp.role.level})</td>
              <td className="px-4 py-2 border">{emp.department.name}</td>
              <td className="px-4 py-2 border text-center">{emp.experienceYears}</td>
              <td className="px-4 py-2 border">₹{emp.salary.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
