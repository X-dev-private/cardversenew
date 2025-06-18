import { useState } from 'react';

export default function BettingArea({ bet, chips, onBet }) {
  const [customBet, setCustomBet] = useState('');
  const [isCustomInput, setIsCustomInput] = useState(false);

  const handleCustomBet = () => {
    const amount = parseInt(customBet);
    if (!isNaN(amount) && amount > 0 && amount <= chips) {
      onBet(amount);
      setCustomBet('');
      setIsCustomInput(false);
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-xl border border-gray-700 backdrop-blur-sm">
      {/* Quick bet buttons */}
      <div className="flex gap-1.5">
        {[10, 25, 50, 100].map((amount) => (
          <button
            key={amount}
            onClick={() => onBet(amount)}
            disabled={chips < amount}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
              bet === amount
                ? 'bg-amber-500 text-white'
                : chips >= amount
                ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            ${amount}
          </button>
        ))}
      </div>

      {/* Custom bet input */}
      {isCustomInput ? (
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input
              type="number"
              value={customBet}
              onChange={(e) => setCustomBet(e.target.value.replace(/\D/g, ''))}
              placeholder="Valor"
              className="w-24 pl-6 pr-2 py-1.5 bg-gray-900 border border-gray-600 rounded-md text-sm text-white focus:outline-none focus:border-amber-500"
              autoFocus
            />
          </div>
          <button
            onClick={handleCustomBet}
            disabled={!customBet || parseInt(customBet) > chips || parseInt(customBet) <= 0}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-sm rounded-md font-medium disabled:bg-gray-700 disabled:text-gray-400"
          >
            OK
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsCustomInput(true)}
          className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm rounded-md font-medium transition-colors"
        >
          Personalizar
        </button>
      )}

      {/* Current bet display */}
      <div className="ml-auto flex items-center gap-2">
        <span className="text-xs text-gray-400">Aposta:</span>
        <span className="text-sm font-medium text-amber-400">${bet}</span>
      </div>
    </div>
  );
}