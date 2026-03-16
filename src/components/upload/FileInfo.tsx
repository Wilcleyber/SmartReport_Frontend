import React from 'react';
import { FileSpreadsheet, X } from 'lucide-react';

interface FileInfoProps {
  fileName: string;
  fileSize: number;
  onRemove: () => void;
}

export const FileInfo: React.FC<FileInfoProps> = ({ fileName, fileSize, onRemove }) => {
  const sizeInMB = (fileSize / (1024 * 1024)).toFixed(2);

  return (
    <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-center justify-between border border-blue-100 animate-in slide-in-from-top-2">
      <div className="flex items-center gap-3">
        <FileSpreadsheet className="text-blue-600" size={24} />
        <div>
          <p className="text-sm font-bold text-blue-900 truncate max-w-xs">{fileName}</p>
          <p className="text-xs text-blue-600">{sizeInMB} MB</p>
        </div>
      </div>
      <button onClick={onRemove} className="text-blue-400 hover:text-red-500 transition-colors">
        <X size={20} />
      </button>
    </div>
  );
};