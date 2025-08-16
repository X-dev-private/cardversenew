import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BettingArea from '../Components/poker/BettingArea';
import PokerTableSurface from '../Components/poker/PokerTableSurface';
import Player from '../Components/player/Player';
import { generateRandomCard, evaluatePokerHand, getStageName } from '../pokerLogic';

function PokerTable() {
  const navigate = useNavigate();
  const [playerCards, setPlayerCards] = useState([]);
  const [communityCards, setCommunityCards] = useState(Array(5).fill(null));
  const [handRank, setHandRank] = useState('');
  const [chips, setChips] = useState(1000);
  const [bet, setBet] = useState(0);
  const [gameStage, setGameStage] = useState('pre-flop');
  const [players, setPlayers] = useState([
    { id: '1', name: 'Alice', chips: 1000, cards: [] },
    { id: '2', name: 'Bob', chips: 1000, cards: [] },
    { id: '3', name: 'Você', chips: 1000, cards: [], isCurrentPlayer: true }
  ]);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Encontra o jogador atual (Você)
  const currentPlayer = players.find(player => player.isCurrentPlayer);

  // Funções para gerenciar jogadores
  const addPlayer = () => {
    const newPlayerId = String(players.length + 1);
    const newPlayer = {
      id: newPlayerId,
      name: `Jogador ${newPlayerId}`,
      chips: 1000,
      cards: [],
      folded: false
    };
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (playerId) => {
    if (players.length <= 2) return; // Mantém pelo menos 2 jogadores
    if (players.find(p => p.id === playerId)?.isCurrentPlayer) return; // Não remove o jogador atual
    
    setPlayers(players.filter(player => player.id !== playerId));
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

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
    if (gameStage === 'showdown') {
      return (
        <div className="flex space-x-2">
          <button
            onClick={resetGame}
            className="px-3 py-1 text-xs rounded font-medium bg-blue-600 hover:bg-blue-700 text-white"
          >
            Nova Mão
          </button>
          <button
            onClick={() => navigate('/Rooms')}
            className="px-3 py-1 text-xs rounded font-medium bg-gray-600 hover:bg-gray-700 text-white"
          >
            Voltar para Salas
          </button>
        </div>
      );
    }
    
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

  const dealCardsToPlayers = () => {
    const newPlayers = players.map(player => {
      return {
        ...player,
        cards: [generateRandomCard(), generateRandomCard()],
        folded: false
      };
    });
    setPlayers(newPlayers);
  };

  const startNewHand = () => {
    if (bet <= 0 || bet > chips) return;
    
    dealCardsToPlayers();
    setPlayerCards([generateRandomCard(), generateRandomCard()]);
    setCommunityCards(Array(5).fill(null));
    setGameStage('pre-flop');
    setHandRank('');
    setChips(chips - bet);
    setBet(0);
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
      setPlayers(players.map(player => 
        player.isCurrentPlayer 
          ? { ...player, chips: player.chips - amount } 
          : player
      ));
      setChips(chips - amount);
    }
  };

  const resetGame = () => {
    setPlayerCards([]);
    setCommunityCards(Array(5).fill(null));
    setHandRank('');
    setBet(0);
    setGameStage('pre-flop');
    setPlayers(players.map(player => ({
      ...player,
      cards: [],
      folded: false
    })));
  };

  const leaveTable = () => {
    navigate('/Rooms');
  };

  const handlePlayerAction = (playerId, action, amount = 0) => {
    console.log(`Jogador ${playerId} executou ${action} com valor ${amount}`);
    
    setPlayers(prevPlayers => prevPlayers.map(player => {
      if (player.id === playerId) {
        switch(action) {
          case 'fold':
            return { ...player, folded: true };
          case 'bet':
          case 'raise':
          case 'call':
            return { ...player, chips: player.chips - amount };
          default:
            return player;
        }
      }
      return player;
    }));
  };

  return (
    <div className="flex h-screen">
      {/* Barra lateral dos jogadores */}
      {sidebarVisible && (
        <div className="w-64 bg-gray-800 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Jogadores</h2>
            <button
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-white"
              title="Esconder barra lateral"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Controles de Jogadores */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={addPlayer}
              disabled={players.length >= 9}
              className={`px-2 py-1 text-xs rounded-md flex-1 ${
                players.length >= 9 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              + Jogador
            </button>
            <button
              onClick={() => removePlayer(players[players.length - 1]?.id)}
              disabled={players.length <= 2}
              className={`px-2 py-1 text-xs rounded-md flex-1 ${
                players.length <= 2
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              - Jogador
            </button>
          </div>

          {/* Lista de Jogadores */}
          <div className="space-y-3">
            {players.map(player => (
              <div key={player.id} className="relative bg-gray-700 rounded-lg p-3">
                <Player
                  id={player.id}
                  name={player.name}
                  initialChips={player.chips}
                  isCurrentPlayer={player.isCurrentPlayer}
                  cards={player.cards}
                  folded={player.folded}
                  currentBet={player.currentBet}
                  compactView={true}
                />
                {!player.isCurrentPlayer && players.length > 2 && (
                  <button
                    onClick={() => removePlayer(player.id)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transform translate-x-1 -translate-y-1"
                    title="Remover jogador"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Área principal da mesa */}
      <div className="flex-1 flex flex-col relative">
        {/* Botão para mostrar/ocultar sidebar */}
        {!sidebarVisible && (
          <button
            onClick={toggleSidebar}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r-lg z-10 hover:bg-gray-700 transition-colors"
            title="Mostrar barra lateral"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        )}

        <PokerTableSurface 
          header={
            <>
              <div className="flex justify-between items-center w-full">
                <div>
                  <h1 className="text-3xl font-bold text-amber-400">Texas Hold'em</h1>
                  <p className="text-gray-300">Estágio: {getStageName(gameStage)}</p>
                  {handRank && <p className="text-gray-300">Sua mão: {handRank}</p>}
                </div>
                <button 
                  onClick={leaveTable}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Voltar para Salas
                </button>
              </div>
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
          players={players} 
        >
          {/* Área de Apostas */}
          {currentPlayer && (
            <BettingArea 
              bet={bet} 
              chips={currentPlayer.chips}
              onBet={placeBet}
              disabled={gameStage !== 'pre-flop'}
              currentPlayerId={currentPlayer.id}
              onPlayerAction={handlePlayerAction}
            />
          )}
        </PokerTableSurface>
      </div>
    </div>
  );
}

export default PokerTable;