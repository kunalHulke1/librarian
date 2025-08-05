import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: 'default' | 'success' | 'warning' | 'danger';
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  color = 'default',
  icon 
}) => {
  const colorClasses = {
    default: 'text-gray-900',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
  };

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="card-body text-center">
        {icon && (
          <div className="flex justify-center mb-2">
            {icon}
          </div>
        )}
        <div className={`text-3xl font-bold mb-2 ${colorClasses[color]}`}>
          {value}
        </div>
        <div className="text-sm text-gray-600 uppercase tracking-wide font-medium">
          {title}
        </div>
        {subtitle && (
          <div className="text-xs text-gray-500 mt-1">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;