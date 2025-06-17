import { getStageName } from './pokerLogic';
import Card from './Card';

export default function HandGenerator({ 
  playerCards = [], 
  communityCards = [], 
  handRank, 
  gameStage, 
  onStartHand, 
  onNextStage 
}) {
  const getRevealedCount = () => {
    switch(gameStage) {
      case 'pre-flop': return 0;
      case 'flop': return 3;
      case 'turn': return 4;
      case 'river': 
      case 'showdown': return 5;
      default: return 0;
    }
  };

  const revealedCount = getRevealedCount();

  return (
    <div className="space-y-3">
      {/* Área de cartas comunitárias (centro) */}
      <div className="text-center">
        <h2 className="text-sm font-medium mb-1 text-gray-300">Cartas Comunitárias</h2>
        <div className="flex justify-center gap-1">
          {communityCards.map((card, index) => (
            <Card
              key={`community-${index}`}
              card={card}
              revealed={index < revealedCount}
              size="sm"
            />
          ))}
        </div>
        
        {/* Indicador de fase abaixo das cartas comunitárias */}
        <div className="flex justify-center mt-2">
          <div className="flex gap-1">
            {['pre-flop', 'flop', 'turn', 'river', 'showdown'].map((stage) => (
              <div 
                key={stage}
                className={`px-2 py-1 rounded text-xs ${
                  gameStage === stage ? 'bg-amber-600 text-white' : 
                  gameStage > stage ? 'bg-gray-700 text-gray-300' : 'bg-gray-800 text-gray-500'
                }`}
              >
                {getStageName(stage)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Área de cartas do jogador (abaixo) */}
      <div className="text-center mt-4">
        <h2 className="text-sm font-medium mb-1 text-gray-300">Suas Cartas</h2>
        <div className="flex justify-center gap-1">
          {playerCards.length > 0 ? (
            playerCards.map((card, index) => (
              <Card 
                key={`player-${index}`} 
                card={card} 
                revealed={true}
                size="sm"
              />
            ))
          ) : (
            <>
              <Card revealed={false} size="sm" />
              <Card revealed={false} size="sm" />
            </>
          )}
        </div>
      </div>

      {/* Controles compactos */}
      <div className="flex justify-center gap-2 mt-4 pb-0">  {/* Removido padding-bottom */}
        <button
          onClick={onStartHand}
          disabled={gameStage !== 'pre-flop'}
          className={`px-3 py-1 text-xs rounded font-medium ${
            gameStage === 'pre-flop' ? 
            'bg-blue-600 hover:bg-blue-700 text-white' : 
            'bg-gray-500 text-gray-300 cursor-not-allowed'
          }`}
        >
          Distribuir
        </button>

        <button
          onClick={onNextStage}
          disabled={gameStage === 'showdown'}
          className={`px-3 py-1 text-xs rounded font-medium ${
            gameStage !== 'showdown' ? 
            'bg-green-600 hover:bg-green-700 text-white' : 
            'bg-gray-500 text-gray-300 cursor-not-allowed'
          }`}
        >
          {gameStage === 'pre-flop' ? 'Flop' : 
           gameStage === 'flop' ? 'Turn' : 
           gameStage === 'turn' ? 'River' : 
           gameStage === 'river' ? 'Resultado' : 'Final'}
        </button>
      </div>

      {/* Resultado compacto */}
      {handRank && (
        <div className="text-center mt-3 pb-0">  {/* Removido padding-bottom */}
          <div className="inline-block bg-gray-800 px-3 py-1 rounded border border-amber-500/50">
            <p className="text-xs text-amber-300">Melhor Mão</p>
            <p className="text-sm font-semibold text-white">{handRank}</p>
          </div>
        </div>
      )}
    </div>
  );
}