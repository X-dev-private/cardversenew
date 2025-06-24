import { useState } from 'react';

export default function PokerTableSurface({ 
  children, 
  chips, 
  onReset,
  playerCards = [],
  communityCards = [],
  handRank,
  gameStage,
  onStartHand,
  onNextStage,
  revealedCount,
  stageControls,
  stageIndicator
}) {
  const [playerPosition, setPlayerPosition] = useState(0);

  const handlePositionChange = (newPosition) => {
    setPlayerPosition(newPosition);
  };

  // Positions array for 10 players (0-9 representing positions 1-10)
  const positions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden bg-gray-900 flex flex-col">
      {/* Main container */}
      <div className="flex-1 flex flex-col relative w-full max-w-8xl mx-auto" style={{ minHeight: '80vh' }}>
        {/* Poker table */}
        <div className="flex-1 relative rounded-t-3xl overflow-hidden" style={{ height: 'calc(100% - 6rem)' }}>
          {/* Table felt */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b6d3d] to-[#083b20]">
            <div className="absolute inset-0 opacity-90" style={{
              backgroundImage: `
                radial-gradient(ellipse at center, rgba(30,150,80,0.5) 0%, transparent 70%),
                repeating-linear-gradient(0deg, rgba(50,170,90,0.15) 0px, rgba(50,170,90,0.15) 2px, transparent 2px, transparent 4px)
              `,
              backgroundSize: 'cover, 20px 20px'
            }}></div>
            
            {/* Community cards */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              flex justify-center gap-1 z-10">
              {communityCards.slice(0, revealedCount).map((card, index) => (
                <div 
                  key={`community-${index}`}
                  className="w-10 h-14 rounded-md shadow-md flex items-center justify-center border border-gray-200 bg-white"
                >
                  <div className="flex flex-col items-center">
                    <span className={`text-xs font-bold ${['♥','♦'].includes(card.suit) ? 'text-red-500' : 'text-black'}`}>
                      {card.rank}
                    </span>
                    <span className={`text-lg ${['♥','♦'].includes(card.suit) ? 'text-red-500' : 'text-black'}`}>
                      {card.suit}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Reset button */}
            <button 
              onClick={onReset}
              className="absolute top-4 left-4 z-20 bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 
                text-white font-bold py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-lg
                border-2 border-red-700 flex items-center text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Reiniciar
            </button>

            {/* Player positions arranged in a perfect circle */}
            {positions.map((pos) => {
              // Calculate angle for 10 positions (36° each)
              const angle = (pos * 36) * (Math.PI / 180);
              
              return (
                <div 
                  key={pos}
                  className="absolute w-24 h-20 flex flex-col items-center justify-center group cursor-pointer"
                  style={{
                    top: `${50 + 40 * Math.sin(angle)}%`,
                    left: `${50 + 40 * Math.cos(angle)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => handlePositionChange(pos)}
                >
                  {/* Player cards */}
                  {pos === playerPosition && playerCards.length > 0 && (
                    <div className="flex mb-1">
                      {playerCards.map((card, index) => (
                        <div 
                          key={`player-${index}`}
                          className="w-10 h-14 bg-white rounded-md shadow-md flex items-center justify-center border border-gray-300 -mr-2 last:mr-0"
                        >
                          <div className="flex flex-col items-center">
                            <span className={`text-xs font-bold ${['♥','♦'].includes(card.suit) ? 'text-red-500' : 'text-black'}`}>
                              {card.rank}
                            </span>
                            <span className={`text-lg ${['♥','♦'].includes(card.suit) ? 'text-red-500' : 'text-black'}`}>
                              {card.suit}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className={`w-10 h-10 ${pos === playerPosition ? 'bg-amber-600/90' : 'bg-[#0a5c36]/90'} rounded-full border-2 border-amber-600 
                    shadow-md flex items-center justify-center hover:scale-110 transition-transform duration-200`}>
                    <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  </div>
                  <span className={`text-xs ${pos === playerPosition ? 'text-amber-300 font-bold' : 'text-white'} opacity-0 group-hover:opacity-100 transition-opacity mt-1`}>
                    Posição {pos + 1}
                  </span>
                </div>
              );
            })}

            {/* Chips area */}
            <div className="absolute top-3 right-3 z-10 bg-amber-900/80 p-2 rounded-lg 
              text-center border border-amber-500 shadow-md min-w-[110px] backdrop-blur-sm">
              <p className="text-amber-200 text-xs uppercase tracking-wider">Fichas</p>
              <p className="text-yellow-200 font-bold text-lg font-mono">
                ${chips.toLocaleString()}
              </p>
            </div>

            {/* Center decoration */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              w-20 h-20 rounded-full border-2 border-amber-500/90 flex items-center justify-center z-0">
              <div className="text-3xl text-amber-300/90 font-bold">♠</div>
            </div>
          </div>

          {/* Table border */}
          <div className="absolute inset-0 border-[14px] border-[#5a2c0d] rounded-t-3xl pointer-events-none">
            <div className="absolute inset-0 border-[4px] border-amber-800/70 rounded-xl"></div>
          </div>

          {/* Combined Game State and Hand Result area */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[180%] w-full max-w-md z-20">
            <div className="flex flex-col items-center space-y-3">
              {/* Stage indicator - now always visible */}
              <div className="w-full flex justify-center">
                {stageIndicator}
              </div>
              
              {/* Hand result - appears when available */}
              {handRank && (
                <div className="text-center">
                  <div className="inline-block bg-gray-800/90 px-3 py-1 rounded border border-amber-500/50 shadow-sm">
                    <p className="text-xs text-amber-300">Melhor Mão</p>
                    <p className="text-sm font-semibold text-white">{handRank}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Poker action buttons (replacing the old betting area) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[40%] w-full max-w-md z-20 mt-16">
            <div className="flex flex-col items-center space-y-3">
              <div className="flex justify-center gap-2">
                <button
                  onClick={onStartHand}
                  disabled={gameStage !== 'pre-flop'}
                  className={`px-4 py-2 text-sm rounded font-medium shadow-md ${
                    gameStage === 'pre-flop' ? 
                    'bg-blue-600 hover:bg-blue-700 text-white' : 
                    'bg-gray-500 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  Distribuir Cartas
                </button>
                <div className="flex gap-2">
                  {stageControls}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New betting area below the table */}
        <div className="w-full h-20 flex items-center justify-center px-2 mt-2">
          <div className="w-full max-w-3xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}