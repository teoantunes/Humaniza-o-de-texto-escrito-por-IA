
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
        Revisor de Texto Humano
      </h1>
      <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
        Transforme seus parágrafos com IA, garantindo um toque genuinamente humano e persuasivo, livre de padrões robóticos.
      </p>
    </header>
  );
};

export default Header;
