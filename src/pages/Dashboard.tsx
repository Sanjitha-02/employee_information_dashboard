import React, { useState, useMemo } from 'react';
import EmployeeList from '../components/EmployeeList';
import FilterBar from '../components/FilterBar';
import { Employees as mockEmployees } from '../data/Employees';
import { Employee } from '../interfaces/types';
import EmployeeForm from '../components/EmployeeForm';
import { v4 as uuidv4 } from 'uuid'; 

const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [selectedDept, setSelectedDept] = useState('');
  const [experienceRange, setExperienceRange] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [showForm, setShowForm] = useState(false);

  const departments = Array.from(new Set(employees.map(emp => emp.department.name)));

  const filteredEmployees = useMemo(() => {
    let data = [...employees];

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
  }, [selectedDept, experienceRange, sortKey, employees]);

  const handleCreate = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleFormSubmit = (formData: Omit<Employee, 'id'>) => {
    if (editingEmployee) {
      // Edit
      setEmployees(prev =>
        prev.map(emp => (emp.id === editingEmployee.id ? { ...editingEmployee, ...formData } : emp))
      );
    } else {
      // Create
      setEmployees(prev => [
        ...prev,
        {
          id: uuidv4(),
          ...formData,
        },
      ]);
    }

    setShowForm(false);
    setEditingEmployee(null);
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

      {showForm && (
        <EmployeeForm
          initialData={editingEmployee ?? undefined}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
