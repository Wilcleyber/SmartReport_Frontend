import React from 'react';

export const DashboardGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      {children}
    </div>
  );
};