// src/components/SummaryCards.tsx
import React from 'react';

interface SummaryCardsProps {
  totalEmployees: number;
  activeEmployees: number;
  averageSalary: number;
  totalDepartments: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalEmployees,
  activeEmployees,
  averageSalary,
  totalDepartments
}) => {
  const cards = [
    { title: 'Total Employees', value: totalEmployees, color: 'bg-blue-600' },
    { title: 'Active Employees', value: activeEmployees, color: 'bg-green-600' },
    { title: 'Average Salary', value: `₹${averageSalary.toLocaleString()}`, color: 'bg-yellow-500' },
    { title: 'Departments', value: totalDepartments, color: 'bg-purple-600' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} text-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105`}
        >
          <h3 className="text-sm font-medium">{card.title}</h3>
          <p className="text-2xl font-bold mt-1">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
