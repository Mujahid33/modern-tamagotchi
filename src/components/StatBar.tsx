
import React from 'react';
import { useTheme } from '@/hooks/useTheme';

interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  darkColor?: string;
}

const StatBar: React.FC<StatBarProps> = ({ label, value, maxValue, color, darkColor = color }) => {
  const percentage = Math.min(Math.max((value / maxValue) * 100, 0), 100);
  const { theme } = useTheme();
  
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{value}/{maxValue}</span>
      </div>
      <div className="stat-bar dark:bg-gray-700">
        <div 
          className="stat-bar-fill" 
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: theme === 'dark' ? darkColor : color,
            opacity: theme === 'dark' ? 0.7 : 1
          }}
        />
      </div>
    </div>
  );
};

export default StatBar;
