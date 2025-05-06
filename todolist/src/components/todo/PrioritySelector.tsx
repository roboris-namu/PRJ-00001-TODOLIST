import React from 'react';
import { FaFlag } from 'react-icons/fa';
import { Priority } from '../../types/todo';
import { withIconType } from '../../utils/icons';

interface PrioritySelectorProps {
  value: Priority;
  onChange: (value: Priority) => void;
  className?: string;
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({ value, onChange, className = '' }) => {
  const options = [
    { value: Priority.High, label: 'High', color: 'text-red-500' },
    { value: Priority.Medium, label: 'Medium', color: 'text-yellow-500' },
    { value: Priority.Low, label: 'Low', color: 'text-green-500' }
  ];

  const FlagIcon = withIconType(FaFlag);

  return (
    <div className={`relative inline-block ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value) as Priority)}
        className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md pl-10 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <FlagIcon className={`
          ${value === Priority.High ? 'text-red-500' : ''}
          ${value === Priority.Medium ? 'text-yellow-500' : ''}
          ${value === Priority.Low ? 'text-green-500' : ''}
        `} />
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default PrioritySelector; 