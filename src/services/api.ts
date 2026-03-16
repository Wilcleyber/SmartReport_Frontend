import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

// Interceptador para tratar erros globais (Módulo 2 do Mapa)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'Ocorreu um erro inesperado.';
    
    if (error.response) {
      // Erros vindos do Backend (400, 429, 500)
      message = error.response.data.detail || 'Erro no processamento dos dados.';
      if (error.response.status === 429) message = 'Limite de análise atingido. Tente em breve!';
    } else if (error.request) {
      // Erro de rede (Backend offline)
      message = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
    }

    return Promise.reject(message);
  }
);