
import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  disabled: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, placeholder, disabled }) => {
  return (
    <div className="w-full h-full flex flex-col">
       <label htmlFor="input-text" className="mb-2 text-lg font-semibold text-gray-300">Seu Texto</label>
      <textarea
        id="input-text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full h-80 md:h-full flex-grow p-4 bg-gray-800 border-2 border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 resize-none disabled:opacity-50"
      />
    </div>
  );
};

export default TextInput;
