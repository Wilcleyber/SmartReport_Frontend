import React from 'react';
import { BarChart3, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-8 mb-8">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <BarChart3 size={24} />
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">SmartReport</span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
          <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <ShieldCheck size={16} />
            <span>LGPD Protected</span>
          </div>
          <span>ADS Project</span>
        </div>
      </div>
    </nav>
  );
};