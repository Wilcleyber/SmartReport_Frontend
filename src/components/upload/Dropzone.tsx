import { useCallback, type FC } from 'react'; // Usamos type FC para o padrão de componente
import { useDropzone, type FileRejection } from 'react-dropzone'; // Importando o tipo correto para rejeições
import { UploadCloud } from 'lucide-react'; // Removido FileWarning pois não estava sendo usado

interface DropzoneProps {
  onFileAccepted: (file: File) => void;
  onError: (message: string) => void;
}

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export const Dropzone: FC<DropzoneProps> = ({ onFileAccepted, onError }) => {
  // Ajuste na Linha 13: Trocamos 'any[]' pelo tipo real 'FileRejection[]'
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    
    // 1. Tratamento de Erros Imediato (Pré-validação)
    if (fileRejections.length > 0) {
      const error = fileRejections[0].errors[0];
      
      if (error.code === 'file-too-large') {
        onError('Arquivo muito grande! O limite é 10MB.');
      } else if (error.code === 'file-invalid-type') {
        onError('Formato inválido! Use apenas .csv ou .xlsx.');
      } else {
        onError('Erro ao carregar arquivo.');
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      onFileAccepted(acceptedFiles[0]);
    }
  }, [onFileAccepted, onError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: MAX_SIZE,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: false
  });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all
        ${isDragActive ? 'border-blue-500 bg-blue-50 shadow-inner' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
    >
      <input {...getInputProps()} />
      <UploadCloud size={48} className={isDragActive ? 'text-blue-500 animate-bounce' : 'text-gray-400'} />
      <p className="mt-4 text-lg font-medium text-gray-700 text-center">
        {isDragActive ? 'Solte o arquivo aqui...' : 'Arraste sua planilha ou clique para buscar'}
      </p>
      <span className="text-sm text-gray-400 mt-2 font-light italic">
        Formatos aceitos: .CSV e .XLSX (Máx 10MB)
      </span>
    </div>
  );
};