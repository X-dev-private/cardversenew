import { useState } from 'react';
import BettingArea from './BettingArea';
import HandGenerator from './HandGenerator';
import PokerTableSurface from './PokerTableSurface';
import { generateRandomCard, evaluatePokerHand, getStageName } from './pokerLogic';

function PokerTable() {
  const [playerCards, setPlayerCards] = useState([]);
  const [communityCards, setCommunityCards] = useState(Array(5).fill(null));
  const [handRank, setHandRank] = useState('');
  const [chips, setChips] = useState(1000);
  const [bet, setBet] = useState(0);
  const [gameStage, setGameStage] = useState('pre-flop');

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
        // Revela o Flop (3 cartas)
        newCommunityCards[0] = generateRandomCard();
        newCommunityCards[1] = generateRandomCard();
        newCommunityCards[2] = generateRandomCard();
        setGameStage('flop');
        break;
        
      case 'flop':
        // Revela o Turn (1 carta)
        newCommunityCards[3] = generateRandomCard();
        setGameStage('turn');
        break;
        
      case 'turn':
        // Revela o River (1 carta)
        newCommunityCards[4] = generateRandomCard();
        setGameStage('river');
        break;
        
      case 'river':
        // Mostra o resultado
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
    >
      <BettingArea 
        bet={bet} 
        chips={chips}
        onBet={placeBet}
        disabled={gameStage !== 'pre-flop'}
      />
      
      <HandGenerator 
        playerCards={playerCards}
        communityCards={communityCards}
        handRank={handRank}
        gameStage={gameStage}
        onStartHand={startNewHand}
        onNextStage={nextStage}
      />
    </PokerTableSurface>
  );
}

export default PokerTable;