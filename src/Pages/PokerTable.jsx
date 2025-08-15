import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChips } from '../ChipsContext';
import BettingArea from '../Components/poker/BettingArea';
import PokerTableSurface from '../Components/poker/PokerTableSurface';
import { generateRandomCard, evaluatePokerHand, getStageName } from '../pokerLogic';

function PokerTable() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { chips: initialChips, deductChips, addChips } = useChips();
  
  const [room, setRoom] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [communityCards, setCommunityCards] = useState(Array(5).fill(null));
  const [handRank, setHandRank] = useState('');
  const [chips, setChips] = useState(initialChips);
  const [bet, setBet] = useState(0);
  const [gameStage, setGameStage] = useState('pre-flop');
  const [players, setPlayers] = useState([]);
  const [pot, setPot] = useState(0);

  // Carregar dados da sala (simulado)
  useEffect(() => {
    // Em uma aplicação real, você buscaria os dados da sala da API
    const loadedRoom = {
      id: roomId,
      name: roomId === '1' ? 'Mesa Alta' : 'Torneio Iniciante',
      blinds: roomId === '1' ? '100/200' : '10/20',
      buyIn: roomId === '1' ? 5000 : 1000,
      maxPlayers: 6,
      players: [
        { id: '1', name: 'Jogador 1', chips: 10000 },
        { id: '2', name: 'Você', chips: initialChips }
      ]
    };
    
    setRoom(loadedRoom);
    setPlayers(loadedRoom.players);
  }, [roomId, initialChips]);

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
        className="px-4 py-2 rounded font-medium bg-green-600 hover:bg-green-700 text-white"
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
      <div className="flex space-x-1 mb-4">
        {stages.map((stage, index) => (
          <div 
            key={stage}
            className={`h-1 w-8 rounded-full ${
              stages.indexOf(gameStage) >= index ? 'bg-amber-400' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  const startNewHand = () => {
    if (bet <= 0 || bet > chips) return;
    
    // Deduzir as fichas da aposta inicial
    deductChips(bet);
    setPot(bet);
    
    setPlayerCards([generateRandomCard(), generateRandomCard()]);
    setCommunityCards(Array(5).fill(null));
    setGameStage('pre-flop');
    setHandRank('');
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
        const rank = evaluatePokerHand(allCards);
        setHandRank(rank);
        
        // Simular resultado (50% chance de vitória)
        if (Math.random() > 0.5) {
          const winnings = pot * 2;
          addChips(winnings);
          alert(`Você ganhou! ${rank} - Prêmio: ${winnings} fichas`);
        } else {
          alert(`Você perdeu! ${rank}`);
        }
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

  const leaveTable = () => {
    navigate('/poker-rooms');
  };

  const resetGame = () => {
    setPlayerCards([]);
    setCommunityCards(Array(5).fill(null));
    setHandRank('');
    setBet(0);
    setPot(0);
    setGameStage('pre-flop');
  };

  if (!room) {
    return <div className="flex justify-center items-center h-screen">Carregando mesa...</div>;
  }

  return (
    <div className="min-h-screen bg-green-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header da Mesa */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-amber-400">{room.name} (ID: {room.id})</h1>
            <p className="text-gray-300">Blinds: {room.blinds} | Buy-in: ${room.buyIn.toLocaleString()}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-gray-800 px-4 py-2 rounded-lg">
              <span className="font-bold text-amber-400">{chips.toLocaleString()}</span> fichas
            </div>
            <button 
              onClick={leaveTable}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              Sair da Mesa
            </button>
          </div>
        </div>

        {/* Área do Jogo */}
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

        {/* Lista de Jogadores */}
        <div className="mt-8 bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-bold text-amber-400 mb-4">Jogadores na Mesa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {players.map(player => (
              <div key={player.id} className="bg-gray-700 p-3 rounded-lg">
                <p className="font-bold">{player.name}</p>
                <p>{player.chips.toLocaleString()} fichas</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokerTable;