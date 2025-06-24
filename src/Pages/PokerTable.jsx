import { useState } from 'react';
import BettingArea from '../Components/poker/BettingArea';
import PokerTableSurface from '../Components/poker/PokerTableSurface';
import { generateRandomCard, evaluatePokerHand, getStageName } from '../pokerLogic';

function PokerTable() {
  const [playerCards, setPlayerCards] = useState([]);
  const [communityCards, setCommunityCards] = useState(Array(5).fill(null));
  const [handRank, setHandRank] = useState('');
  const [chips, setChips] = useState(1000);
  const [bet, setBet] = useState(0);
  const [gameStage, setGameStage] = useState('pre-flop');

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

  const getStageControls = () => {
    if (gameStage === 'showdown') return null;
    
    return (
      <button
        onClick={nextStage}
        className="px-3 py-1 text-xs rounded font-medium bg-green-600 hover:bg-green-700 text-white"
      >
        {gameStage === 'pre-flop' ? 'Flop' : 
         gameStage === 'flop' ? 'Turn' : 
         gameStage === 'turn' ? 'River' : 
         'Resultado'}
      </button>
    );
  };

  const getStageIndicator = () => {
    const stages = ['pre-flop', 'flop', 'turn', 'river', 'showdown'];
    return (
      <div className="flex space-x-1">
        {stages.map((stage, index) => (
          <div 
            key={stage}
            className={`h-1 w-6 rounded-full ${
              stages.indexOf(gameStage) >= index ? 'bg-amber-400' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  const startNewHand = () => {
    if (bet <= 0 || bet > chips) return;
    
    setPlayerCards([generateRandomCard(), generateRandomCard()]);
    setCommunityCards(Array(5).fill(null));
    setGameStage('pre-flop');
    setHandRank('');
    setChips(chips - bet);
  };

  const nextStage = () => {
    const newCommunityCards = [...communityCards];
    
    switch(gameStage) {
      case 'pre-flop':
        newCommunityCards[0] = generateRandomCard();
        newCommunityCards[1] = generateRandomCard();
        newCommunityCards[2] = generateRandomCard();
        setGameStage('flop');
        break;
      case 'flop':
        newCommunityCards[3] = generateRandomCard();
        setGameStage('turn');
        break;
      case 'turn':
        newCommunityCards[4] = generateRandomCard();
        setGameStage('river');
        break;
      case 'river':
        setGameStage('showdown');
        const allCards = [...playerCards, ...newCommunityCards];
        setHandRank(evaluatePokerHand(allCards));
        break;
      default:
        break;
    }
    
    setCommunityCards(newCommunityCards);
  };

  const placeBet = (amount) => {
    if (chips >= amount) {
      setBet(amount);
    }
  };

  const resetGame = () => {
    setPlayerCards([]);
    setCommunityCards(Array(5).fill(null));
    setHandRank('');
    setBet(0);
    setChips(1000);
    setGameStage('pre-flop');
  };

  return (
    <PokerTableSurface 
      header={
        <>
          <h1 className="text-3xl font-bold text-amber-400">Texas Hold'em</h1>
          <p className="text-gray-300">Estágio: {getStageName(gameStage)}</p>
        </>
      }
      chips={chips}
      onReset={resetGame}
      playerCards={playerCards}
      communityCards={communityCards}
      handRank={handRank}
      gameStage={gameStage}
      onStartHand={startNewHand}
      onNextStage={nextStage}
      revealedCount={getRevealedCount()}
      stageControls={getStageControls()}
      stageIndicator={getStageIndicator()}
    >
      <BettingArea 
        bet={bet} 
        chips={chips}
        onBet={placeBet}
        disabled={gameStage !== 'pre-flop'}
      />
    </PokerTableSurface>
  );
}

export default PokerTable;