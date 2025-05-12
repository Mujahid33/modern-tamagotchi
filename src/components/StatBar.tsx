
import React from 'react';

interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}

const StatBar: React.FC<StatBarProps> = ({ label, value, maxValue, color }) => {
  const percentage = Math.min(Math.max((value / maxValue) * 100, 0), 100);
  
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-xs font-medium text-gray-500">{value}/{maxValue}</span>
      </div>
      <div className="stat-bar">
        <div 
          className="stat-bar-fill" 
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export default StatBar;
