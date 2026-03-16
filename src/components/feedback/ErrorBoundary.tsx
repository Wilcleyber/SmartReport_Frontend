import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Agora o compilador entende que ErrorInfo é um tipo
    console.error("Uncaught error:", error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-orange-200 animate-in fade-in zoom-in duration-300">
          <AlertTriangle size={48} className="text-orange-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-800">Algo correu mal na interface.</h2>
          <p className="text-gray-500 text-sm mt-2">Um erro inesperado interrompeu a renderização.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 bg-orange-50 text-orange-700 px-6 py-2 rounded-lg font-medium hover:bg-orange-100 transition-colors border border-orange-200"
          >
            Recarregar aplicação
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}