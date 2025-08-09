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
      setEmployees(prev =>
        prev.map(emp => (emp.id === editingEmployee.id ? { ...editingEmployee, ...formData } : emp))
      );
    } else {
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

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.isActive).length;
  const averageSalary = totalEmployees > 0
    ? Math.round(employees.reduce((sum, emp) => sum + emp.salary, 0) / totalEmployees)
    : 0;
  const totalDepartments = new Set(employees.map(emp => emp.department.name)).size;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-600 text-white p-5 rounded-lg shadow-md">
          <h3 className="text-sm font-medium">Total Employees</h3>
          <p className="text-2xl font-bold">{totalEmployees}</p>
        </div>
        <div className="bg-green-600 text-white p-5 rounded-lg shadow-md">
          <h3 className="text-sm font-medium">Active Employees</h3>
          <p className="text-2xl font-bold">{activeEmployees}</p>
        </div>
        <div className="bg-yellow-500 text-white p-5 rounded-lg shadow-md">
          <h3 className="text-sm font-medium">Average Salary</h3>
          <p className="text-2xl font-bold">₹{averageSalary.toLocaleString()}</p>
        </div>
        <div className="bg-purple-600 text-white p-5 rounded-lg shadow-md">
          <h3 className="text-sm font-medium">Departments</h3>
          <p className="text-2xl font-bold">{totalDepartments}</p>
        </div>
      </div>

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
