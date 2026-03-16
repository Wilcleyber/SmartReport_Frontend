import { useState } from 'react';
import { api } from '../services/api';

export interface AnalysisData {
  fileId: string;
  fileName: string;
  analysisSummary: string;
  dataMetrics: Record<string, Record<string, number | string>>;
  chartBase64: string;
  pdfUrl: string;
}

export const useFileUpload = () => {
  const [loading, setLoading] = useState(false);
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalysisData | null>(null);

  const uploadFile = async (file: File) => {
    setLoading(true);
    setError(null);
    setData(null);

    const wakingTimer = setTimeout(() => setIsWakingUp(true), 3000);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post<AnalysisData>('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setData(response.data);
    } catch (err: unknown) {
      // Em TypeScript moderno, erros no catch são 'unknown'
      // Como nosso interceptador no api.ts já retorna uma string de erro:
      if (typeof err === 'string') {
        setError(err);
      } else {
        setError('Ocorreu um erro inesperado ao enviar o arquivo.');
      }
    } finally {
      clearTimeout(wakingTimer); // Limpa o timer se a resposta chegar
      setIsWakingUp(false);
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return { uploadFile, loading, isWakingUp, error, data, reset };
};