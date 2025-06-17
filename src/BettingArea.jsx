export default function BettingArea({ bet, chips, onBet }) {
  return (
    <div className="mb-6 p-4 rounded-lg">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Botões de aposta compactos */}
        <div className="flex-1">
          <h2 className="text-lg font-medium mb-3 text-amber-300">Faça sua aposta</h2>
          <div className="flex flex-wrap gap-2">
            {[10, 25, 50, 100, 250, 500].map((amount) => (
              <button
                key={amount}
                onClick={() => onBet(amount)}
                disabled={chips < amount}
                className={`px-3 py-2 text-sm rounded-md font-semibold transition-all ${
                  bet === amount
                    ? 'bg-amber-500 text-white shadow-md'
                    : chips >= amount
                    ? 'bg-gray-700 text-gray-100 hover:bg-gray-600 shadow-sm'
                    : 'bg-gray-800 text-gray-400 cursor-not-allowed'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
        </div>
        
        {/* Display de aposta atual compacto */}
        <div className="bg-gray-800/80 p-3 rounded-md border border-amber-600/50 min-w-[100px] text-center">
          <p className="text-gray-300 text-xs mb-1">Aposta Atual</p>
          <p className="text-xl font-bold text-amber-300">${bet}</p>
        </div>
      </div>
    </div>
  )
}