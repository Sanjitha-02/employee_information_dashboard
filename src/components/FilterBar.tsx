import React from 'react';

interface FilterBarProps {
  departments: string[];
  selectedDept: string;
  onDeptChange: (value: string) => void;
  experienceRange: string;
  onExperienceChange: (value: string) => void;
  sortKey: string;
  onSortChange: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  departments,
  selectedDept,
  onDeptChange,
  experienceRange,
  onExperienceChange,
  sortKey,
  onSortChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Department Filter */}
      <select
        value={selectedDept}
        onChange={(e) => onDeptChange(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="">All Departments</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      {/* Experience Filter */}
      <select
        value={experienceRange}
        onChange={(e) => onExperienceChange(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="">All Experience Levels</option>
        <option value="0-2">0–2 years</option>
        <option value="3-5">3–5 years</option>
        <option value="6+">6+ years</option>
      </select>

      {/* Sort Filter */}
      <select
        value={sortKey}
        onChange={(e) => onSortChange(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="name">Sort by Name</option>
        <option value="experience">Sort by Experience</option>
        <option value="salary">Sort by Salary</option>
      </select>
    </div>
  );
};

export default FilterBar;
