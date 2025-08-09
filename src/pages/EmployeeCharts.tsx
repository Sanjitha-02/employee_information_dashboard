import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';

import { Employees } from '../data/Employees';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

const EmployeeCharts: React.FC = () => {
  const navigate = useNavigate();

  // ✅ Department distribution
  const departmentDistribution = Employees.reduce((acc, emp) => {
    const dept = emp.department.name;
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(departmentDistribution).map(([name, value]) => ({ name, value }));

  // ✅ Salary buckets
  const salaryBuckets = [
    { name: '<3L', range: [0, 300000], count: 0 },
    { name: '3-6L', range: [300001, 600000], count: 0 },
    { name: '6-10L', range: [600001, 1000000], count: 0 },
    { name: '10L+', range: [1000001, Infinity], count: 0 },
  ];

  Employees.forEach(emp => {
    salaryBuckets.forEach(bucket => {
      if (emp.salary >= bucket.range[0] && emp.salary <= bucket.range[1]) {
        bucket.count++;
      }
    });
  });

  // ✅ Avg salary per department
  const salaryByDept = Employees.reduce((acc, emp) => {
    const dept = emp.department.name;
    if (!acc[dept]) acc[dept] = { total: 0, count: 0 };
    acc[dept].total += emp.salary;
    acc[dept].count++;
    return acc;
  }, {} as Record<string, { total: number, count: number }>);

  const avgSalaryData = Object.entries(salaryByDept).map(([name, val]) => ({
    name,
    avgSalary: Math.round(val.total / val.count)
  }));

  return (
    <div className="p-6 space-y-8">
      {/* ✅ Minimal Back Button with only symbol */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate('/')}
          className="text-2xl mr-4 hover:opacity-70"
          aria-label="Go back"
        >
          ⬅
        </button>
        <h1 className="text-2xl font-bold">Employee Charts</h1>
      </div>

      {/* Pie Chart */}
      <div className="w-full h-96">
        <h2 className="text-lg font-semibold mb-2">Employee Distribution by Department</h2>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Salary Distribution */}
      <div className="w-full h-96">
        <h2 className="text-lg font-semibold mb-2">Salary Distribution</h2>
        <ResponsiveContainer>
          <BarChart data={salaryBuckets}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Average Salary */}
      <div className="w-full h-96">
        <h2 className="text-lg font-semibold mb-2">Department-wise Average Salary</h2>
        <ResponsiveContainer>
          <BarChart data={avgSalaryData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="avgSalary" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmployeeCharts;
