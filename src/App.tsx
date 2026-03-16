import { Navbar } from './components/layout/Navbar';
import { ErrorBoundary } from './components/feedback/ErrorBoundary';
import { Dashboard } from './views/Dashboard';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. O ErrorBoundary protege a aplicação de falhas críticas de renderização */}
      <ErrorBoundary>
        
        {/* 2. Navbar fixa para manter a identidade do projeto */}
        <Navbar />

        {/* 3. A View principal que orquestra o estado do Upload e Resultados */}
        <Dashboard />

        {/* Rodapé simples para dar acabamento profissional */}
        <footer className="py-8 text-center text-gray-400 text-sm">
          <p>© 2026 SmartReport - Projeto Acadêmico ADS</p>
          <p>Processamento seguro via Llama-3 (Groq API) & Pandas</p>
        </footer>

      </ErrorBoundary>
    </div>
  );
}

export default App;
