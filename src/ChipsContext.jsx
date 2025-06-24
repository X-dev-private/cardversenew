import { createContext, useContext, useState } from 'react';

const ChipsContext = createContext();

export function ChipsProvider({ children }) {
  const [chips, setChips] = useState(1000); // Valor inicial de fichas
  const [cvTokens, setCvTokens] = useState(100); // Valor inicial de CV tokens

  // Função para adicionar fichas
  const addChips = (amount) => {
    setChips(prev => prev + amount);
  };

  // Função para remover fichas
  const removeChips = (amount) => {
    setChips(prev => (prev - amount >= 0 ? prev - amount : prev));
  };

  // Função para adicionar CV tokens
  const addCvTokens = (amount) => {
    setCvTokens(prev => prev + amount);
  };

  // Função para remover CV tokens
  const removeCvTokens = (amount) => {
    setCvTokens(prev => (prev - amount >= 0 ? prev - amount : prev));
  };

  return (
    <ChipsContext.Provider value={{ 
      chips, 
      cvTokens,
      addChips, 
      removeChips,
      addCvTokens,
      removeCvTokens 
    }}>
      {children}
    </ChipsContext.Provider>
  );
}

export function useChips() {
  return useContext(ChipsContext);
}