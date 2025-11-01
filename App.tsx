
import React, { useState, useCallback } from 'react';
import { rewriteText } from './services/geminiService';
import Header from './components/Header';
import TextInput from './components/TextInput';
import OutputDisplay from './components/OutputDisplay';
import { LoadingIcon } from './components/Icons';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRewrite = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Por favor, insira um texto para reescrever.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setOutputText('');

    try {
      const result = await rewriteText(inputText);
      setOutputText(result);
    } catch (err) {
      setError('Ocorreu um erro ao processar sua solicitação. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl">
        <Header />
        
        <main className="mt-8 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          <div className="flex-1">
            <TextInput
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Cole aqui o parágrafo para ser corrigido e humanizado..."
              disabled={isLoading}
            />
          </div>

          <div className="flex-1">
             <OutputDisplay
              text={outputText}
              isLoading={isLoading}
              error={error}
             />
          </div>
        </main>
        
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleRewrite}
            disabled={isLoading || !inputText}
            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            {isLoading ? (
              <>
                <LoadingIcon />
                Processando...
              </>
            ) : (
              'Corrigir e Humanizar'
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default App;
