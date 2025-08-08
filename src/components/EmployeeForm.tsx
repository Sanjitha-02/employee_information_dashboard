import React, { useState, useEffect } from 'react';
import { Employee } from '../interfaces/types';

interface Props {
  initialData?: Employee;
  onSubmit: (data: Omit<Employee, 'id'>) => void;
  onClose: () => void;
}

const EmployeeForm: React.FC<Props> = ({ initialData, onSubmit, onClose }) => {
  const [formState, setFormState] = useState<Omit<Employee, 'id'>>({
    firstName: '',
    lastName: '',
    email: '',
    role: { id: '', title: '', level: '' },
    department: { id: '', name: '', description: '' },
    experienceYears: 0,
    specialization: [],
    salary: 0,
    location: '',
    startDate: new Date(),
    skills: [],
    performanceRating: 0,
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setFormState(rest);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'experienceYears' || name === 'salary' || name === 'performanceRating') {
      setFormState(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormState(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
    <h2 className="text-xl font-semibold mb-4">
      {initialData ? 'Edit Employee' : 'Create Employee'}
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        name="firstName"
        value={formState.firstName}
        onChange={handleChange}
        placeholder="First Name"
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
      />
      <input
        name="lastName"
        value={formState.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
      />
      <input
        name="email"
        value={formState.email}
        onChange={handleChange}
        placeholder="Email"
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
      />
      <input
        name="role.title"
        value={formState.role.title}
        onChange={(e) =>
          setFormState((prev) => ({
            ...prev,
            role: { ...prev.role, title: e.target.value },
          }))
        }
        placeholder="Role Title"
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
      />
      <input
        name="department.name"
        value={formState.department.name}
        onChange={(e) =>
          setFormState((prev) => ({
            ...prev,
            department: { ...prev.department, name: e.target.value },
          }))
        }
        placeholder="Department"
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
      />
      <input
        name="experienceYears"
        type="number"
        value={formState.experienceYears}
        onChange={handleChange}
        placeholder="Experience (Years)"
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
      />
      <input
        name="salary"
        type="number"
        value={formState.salary}
        onChange={handleChange}
        placeholder="Salary"
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
      />
    </div>

    <div className="flex justify-end mt-6 gap-4">
      <button
        onClick={onClose}
        className="px-4 py-2 rounded-md border border-gray-400 text-gray-600 hover:bg-gray-100"
      >
        Cancel
      </button>
      <button
        onClick={() => onSubmit(formState)}
        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
      >
        {initialData ? 'Update' : 'Create'}
      </button>
    </div>
  </div>
</div>
  );
};

export default EmployeeForm;
