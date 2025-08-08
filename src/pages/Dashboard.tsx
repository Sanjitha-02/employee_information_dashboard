import React, { useState, useMemo } from 'react';
import EmployeeList from '../components/EmployeeList';
import FilterBar from '../components/FilterBar';
import { Employees } from '../data/Employees';
import { Employee } from '../interfaces/types';

const Dashboard: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState('');
  const [experienceRange, setExperienceRange] = useState('');
  const [sortKey, setSortKey] = useState('name');

  const departments = Array.from(new Set(Employees.map(emp => emp.department.name)));

  const filteredEmployees = useMemo(() => {
    let data = [...Employees];

    if (selectedDept) {
      data = data.filter(emp => emp.department.name === selectedDept);
    }

    if (experienceRange) {
      data = data.filter(emp => {
        const exp = emp.experienceYears;
        if (experienceRange === '0-2') return exp <= 2;
        if (experienceRange === '3-5') return exp >= 3 && exp <= 5;
        if (experienceRange === '6+') return exp >= 6;
        return true;
      });
    }

    if (sortKey === 'name') {
      data.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sortKey === 'experience') {
      data.sort((a, b) => b.experienceYears - a.experienceYears);
    } else if (sortKey === 'salary') {
      data.sort((a, b) => b.salary - a.salary);
    }

    return data;
  }, [selectedDept, experienceRange, sortKey]);

  const handleEdit = (employee: Employee) => {
    console.log('Editing:', employee);
  };

  const handleCreate = () => {
    console.log('Creating new employee');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>

      <FilterBar
        departments={departments}
        selectedDept={selectedDept}
        onDeptChange={setSelectedDept}
        experienceRange={experienceRange}
        onExperienceChange={setExperienceRange}
        sortKey={sortKey}
        onSortChange={setSortKey}
      />

      <EmployeeList
        employees={filteredEmployees}
        onEdit={handleEdit}
        onCreate={handleCreate}
      />
    </div>
  );
};

export default Dashboard;
