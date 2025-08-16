import { useState } from 'react';

export default function BettingArea({ 
  bet, 
  chips, 
  onBet, 
  disabled,
  currentPlayerId,
  onPlayerAction 
}) {
  const [customBet, setCustomBet] = useState('');
  const [isCustomInput, setIsCustomInput] = useState(false);

  const handleBet = (amount) => {
    if (disabled) return;
    
    const amountNumber = parseInt(amount);
    if (amountNumber > 0 && amountNumber <= chips) {
      onBet(amountNumber);
      // Dispara ação do jogador
      if (amountNumber > 0) {
        if (bet === 0) {
          onPlayerAction(currentPlayerId, 'bet', amountNumber);
        } else if (amountNumber > bet) {
          onPlayerAction(currentPlayerId, 'raise', amountNumber - bet);
        } else {
          onPlayerAction(currentPlayerId, 'call', amountNumber);
        }
      }
    }
  };

  const handleCustomBet = () => {
    const amount = parseInt(customBet);
    if (!isNaN(amount) && amount > 0 && amount <= chips) {
      handleBet(amount);
      setCustomBet('');
      setIsCustomInput(false);
    }
  };

  const handleCheck = () => {
    if (!disabled) {
      onPlayerAction(currentPlayerId, 'check');
    }
  };

  const handleFold = () => {
    if (!disabled) {
      onPlayerAction(currentPlayerId, 'fold');
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-800/30 rounded-xl border border-gray-700 backdrop-blur-sm">
      {/* Ações básicas */}
      <div className="flex gap-2">
        <button
          onClick={handleFold}
          disabled={disabled}
          className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
            disabled 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          Fold
        </button>
        
        <button
          onClick={handleCheck}
          disabled={disabled || bet > 0}
          className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
            disabled || bet > 0
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          Check
        </button>
        
        <button
          onClick={() => handleBet(bet)}
          disabled={disabled || bet === 0 || bet > chips}
          className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
            disabled || bet === 0 || bet > chips
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Call ${bet}
        </button>
      </div>

      {/* Apostas rápidas */}
      <div className="flex flex-wrap gap-1.5">
        {[10, 25, 50, 100].map((amount) => (
          <button
            key={amount}
            onClick={() => handleBet(amount)}
            disabled={disabled || chips < amount}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
              bet === amount
                ? 'bg-amber-500 text-white'
                : chips >= amount && !disabled
                ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            ${amount}
          </button>
        ))}
      </div>

      {/* Aposta personalizada */}
      <div className="flex items-center gap-2">
        {isCustomInput ? (
          <>
            <div className="relative flex-1">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                value={customBet}
                onChange={(e) => setCustomBet(e.target.value.replace(/\D/g, ''))}
                placeholder="Valor"
                className="w-full pl-6 pr-2 py-1.5 bg-gray-900 border border-gray-600 rounded-md text-sm text-white focus:outline-none focus:border-amber-500"
                autoFocus
                disabled={disabled}
              />
            </div>
            <button
              onClick={handleCustomBet}
              disabled={disabled || !customBet || parseInt(customBet) > chips || parseInt(customBet) <= 0}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-sm rounded-md font-medium disabled:bg-gray-700 disabled:text-gray-400"
            >
              OK
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsCustomInput(true)}
            disabled={disabled}
            className={`px-3 py-1.5 flex-1 text-sm rounded-md font-medium transition-colors ${
              disabled 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            }`}
          >
            Personalizar Aposta
          </button>
        )}
      </div>

      {/* Informações da aposta */}
      <div className="flex justify-between items-center pt-2 border-t border-gray-700">
        <div className="text-xs text-gray-400">
          <span>Saldo: </span>
          <span className="font-mono text-amber-400">${chips}</span>
        </div>
        <div className="text-xs text-gray-400">
          <span>Aposta atual: </span>
          <span className="font-mono text-amber-400">${bet}</span>
        </div>
      </div>
    </div>
  );
}