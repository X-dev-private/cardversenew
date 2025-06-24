import { getStageName } from '../../pokerLogic';

const StageLogic = ({ gameStage, onNextStage }) => {
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

  return {
    revealedCount: getRevealedCount(),
    stageControls: (
      <div className="flex justify-center gap-2 mt-4 pb-0">
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
    ),
    stageIndicator: (
      <div className="flex justify-center gap-1">
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
    )
  };
};

export default StageLogic;