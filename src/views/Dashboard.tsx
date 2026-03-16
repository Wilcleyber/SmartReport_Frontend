import React, { useState, useEffect } from 'react';
import { useFileUpload } from '../hooks/useFileUpload';
import { Dropzone } from '../components/upload/Dropzone';
import { formatSmartMetric } from '../utils/formatters';
import { SkeletonLoading } from '../components/feedback/SkeletonLoading';
import { DashboardGrid } from '../components/layout/DashboardGrid';
import { 
  LayoutDashboard, 
  FileText, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const Dashboard: React.FC = () => {
  const { uploadFile, loading, isWakingUp, error, data, reset } = useFileUpload();
  const [loadingMessage, setLoadingMessage] = useState('Limpando dados...');

  // Lógica de mensagens rotativas (Módulo B)
  useEffect(() => {
    let interval: number;
    if (loading) {
      const messages = [
        'Sanitizando IDs sensíveis (LGPD)...',
        'Consultando Inteligência Artificial...',
        'Gerando gráficos estratégicos...',
        'Finalizando seu PDF...'
      ];
      
      let i = 0;
      interval = window.setInterval(() => {
        // Se a API ainda estiver acordando, mantém a mensagem de alerta
        if (isWakingUp) {
          setLoadingMessage('O servidor gratuito está acordando... Isso pode levar 90s. Por favor, não feche a página.');
        } else {
          setLoadingMessage(messages[i % messages.length]);
          i++;
        }
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading, isWakingUp]);

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Botão de Reset */}
      {data && (
        <div className="flex justify-end mb-6">
          <button 
            onClick={reset}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition-colors text-gray-600 font-medium border border-gray-200"
          >
            <RefreshCw size={18} /> Nova Análise
          </button>
        </div>
      )}

      {/* ESTADO 1: Upload */}
      {!loading && !data && !error && (
        <div className="bg-white p-8 rounded-2xl shadow-xl animate-in fade-in zoom-in duration-300">
          <Dropzone onFileAccepted={uploadFile} onError={(msg) => alert(msg)} />
        </div>
      )}

      {/* ESTADO 2: Loading */}
      {loading && (
        <div className="space-y-8">
          <div className="flex flex-col items-center justify-center p-10 bg-white rounded-2xl shadow-sm border border-blue-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg font-medium text-blue-600 animate-pulse text-center">{loadingMessage}</p>
          </div>
          <SkeletonLoading />
        </div>
      )}

      {/* ESTADO 3: Erro */}
      {error && (
        <div className="bg-red-50 border-2 border-red-200 p-8 rounded-2xl text-center animate-in shake duration-500">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-red-800 mb-2">Ops! Algo deu errado</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button onClick={reset} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
            Tentar Novamente
          </button>
        </div>
      )}

      {/* ESTADO 4: Resultados */}
      {data && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(data.dataMetrics).slice(0, 3).map(([key, value]) => {
              // Correção Linha 100: Extraímos o valor numérico com segurança
              const rawValue = typeof value === 'object' && value !== null ? (value.media || 0) : value;
              const numericValue = Number(rawValue) || 0; // Se não for número, vira 0
              
              return (
                <div key={key} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-600 hover:shadow-md transition-shadow">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">{key}</p>
                  <p className="text-2xl font-black text-gray-800">
                    {/* Agora passamos numericValue com a certeza de que é um number */}
                    {formatSmartMetric(key, numericValue)}
                  </p>
                </div>
              );
            })}
          </div>

          <DashboardGrid>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 h-full">
              <div className="flex items-center gap-2 mb-6 text-blue-700 border-b pb-4">
                <LayoutDashboard size={20} />
                <h3 className="font-bold uppercase tracking-tight">Análise Estratégica IA</h3>
              </div>
              <div className="prose prose-blue max-w-none text-gray-700">
                <ReactMarkdown>{data.analysisSummary}</ReactMarkdown>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                <h3 className="font-bold uppercase mb-4 text-gray-400 self-start text-sm">Visualização de Tendência</h3>
                <img 
                  src={data.chartBase64} 
                  alt="Gráfico de Análise" 
                  className="rounded-lg w-full h-auto hover:scale-[1.02] transition-transform"
                />
              </div>

              {/* Correção Linha 131: bg-linear-to-r para compatibilidade v4 */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 bg-linear-to-r from-white to-green-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="text-green-600" size={24} />
                    </div>
                    <div>
                      <span className="block text-green-900 font-bold text-lg">Relatório Gerado</span>
                      <span className="text-green-600 text-sm">Pronto para exportação</span>
                    </div>
                  </div>
                  <a 
                    href={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/download/${data.pdfUrl}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 shadow-lg shadow-green-200 transition-all active:scale-95"
                  >
                    <FileText size={18} /> Baixar PDF
                  </a>
                </div>
              </div>
            </div>
          </DashboardGrid>
        </div>
      )}
    </main>
  );
};