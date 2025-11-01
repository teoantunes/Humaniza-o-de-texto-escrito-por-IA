
import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface OutputDisplayProps {
  text: string;
  isLoading: boolean;
  error: string | null;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ text, isLoading, error }) => {
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => {
                setIsCopied(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    const handleCopy = () => {
        if (text) {
            navigator.clipboard.writeText(text);
            setIsCopied(true);
        }
    };
  
    const renderContent = () => {
        if (isLoading) {
            return <div className="flex items-center justify-center h-full text-gray-400">Analisando e reescrevendo...</div>;
        }
        if (error) {
            return <div className="flex items-center justify-center h-full text-red-400">{error}</div>;
        }
        if (text) {
            return <p className="whitespace-pre-wrap">{text}</p>;
        }
        return <div className="flex items-center justify-center h-full text-gray-500">O texto aprimorado aparecerá aqui.</div>;
    };


  return (
    <div className="w-full h-full flex flex-col">
        <div className="flex justify-between items-center mb-2">
             <label className="text-lg font-semibold text-gray-300">Resultado Humanizado</label>
             {text && !isLoading && (
                <button
                    onClick={handleCopy}
                    className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200 text-sm"
                >
                    {isCopied ? <CheckIcon /> : <CopyIcon />}
                    <span className="ml-2">{isCopied ? 'Copiado!' : 'Copiar'}</span>
                </button>
             )}
        </div>
        <div className="w-full h-80 md:h-full flex-grow p-4 bg-gray-800 border-2 border-dashed border-gray-700 rounded-lg text-gray-200 relative">
            {renderContent()}
        </div>
    </div>
  );
};

export default OutputDisplay;
