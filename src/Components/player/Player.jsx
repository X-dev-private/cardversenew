import { useState } from 'react';
import PropTypes from 'prop-types';

function Player({ 
  id, 
  name, 
  initialChips, 
  isCurrentPlayer = false,
  cards = [],
  folded = false,
  currentBet = 0
}) {
  const [chips, setChips] = useState(initialChips);

  // Função para adicionar fichas (ganhos)
  const addWinnings = (amount) => {
    setChips(prevChips => prevChips + amount);
  };

  // Função para atualizar a aposta atual
  const updateBet = (amount) => {
    setChips(prevChips => prevChips - amount);
  };

  return (
    <div className={`
      relative border-2 rounded-lg p-3 bg-gray-700 text-white mb-3
      ${isCurrentPlayer ? 'border-amber-400 shadow-lg shadow-amber-400/30' : 'border-gray-600'}
      ${folded ? 'opacity-60' : ''}
      transition-all duration-200 hover:bg-gray-600
    `}>
      <div className="flex items-center justify-between gap-2">
        {/* Informações do Jogador */}
        <div className="flex-1 min-w-0">
          <h3 className="text-md font-semibold text-amber-400 truncate">{name}</h3>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-mono">{chips}</span>
            {currentBet > 0 && (
              <span className="bg-amber-900 px-1.5 py-0.5 rounded font-mono">
                {currentBet}
              </span>
            )}
          </div>
        </div>
        
        {/* Cartas do Jogador */}
        <div className="flex gap-1">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="w-6 h-8 flex items-center justify-center bg-white text-black rounded text-xs font-bold"
            >
              {isCurrentPlayer || folded ? `${card.rank}${card.suit}` : '🂠'}
            </div>
          ))}
        </div>
      </div>
      
      {/* Status do Jogador */}
      {folded && (
        <div className="absolute top-1 right-1 text-xs italic text-gray-400">
          Folded
        </div>
      )}
    </div>
  );
}

Player.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  initialChips: PropTypes.number.isRequired,
  isCurrentPlayer: PropTypes.bool,
  cards: PropTypes.arrayOf(PropTypes.shape({
    rank: PropTypes.string,
    suit: PropTypes.string
  })),
  folded: PropTypes.bool,
  currentBet: PropTypes.number
};

Player.defaultProps = {
  isCurrentPlayer: false,
  cards: [],
  folded: false,
  currentBet: 0
};

export default Player;