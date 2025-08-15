import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChips } from '../ChipsContext';

function PokerRooms() {
  const navigate = useNavigate();
  const { chips, cvTokens } = useChips();
  
  // Contador para IDs numéricos simples
  const [nextRoomId, setNextRoomId] = useState(3); // Começa em 3 porque já temos 2 salas iniciais

  // Salas iniciais com IDs numéricos simples
  const [rooms, setRooms] = useState([
    { 
      id: 1, // ID numérico simples
      name: 'Mesa Alta', 
      players: 4, 
      maxPlayers: 6, 
      blinds: '100/200', 
      buyIn: 5000 
    },
    { 
      id: 2, // ID numérico simples
      name: 'Torneio Iniciante', 
      players: 2, 
      maxPlayers: 9, 
      blinds: '10/20', 
      buyIn: 1000 
    }
  ]);

  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomBlinds, setNewRoomBlinds] = useState('10/20');
  const [newRoomBuyIn, setNewRoomBuyIn] = useState(1000);

  const joinRoom = (roomId) => {
    navigate(`/poker-table/${roomId}`);
  };

  const createRoom = () => {
    if (!newRoomName.trim()) return;
    
    const newRoom = {
      id: nextRoomId, // Usando o próximo ID numérico
      name: newRoomName,
      players: 1,
      maxPlayers: 6,
      blinds: newRoomBlinds,
      buyIn: newRoomBuyIn
    };
    
    setRooms([...rooms, newRoom]);
    setNextRoomId(nextRoomId + 1); // Incrementa o contador de IDs
    setNewRoomName('');
    joinRoom(newRoom.id);
  };

  return (
    <div className="min-h-screen bg-green-900 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold">
              C
            </div>
            <span className="font-bold text-amber-400">CardVerse Poker</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
              <div className="w-5 h-5 bg-purple-500 rounded-full"></div>
              <span className="font-medium">{cvTokens.toLocaleString()} CV</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
              <div className="w-5 h-5 bg-amber-400 rounded-full"></div>
              <span className="font-medium">{chips.toLocaleString()} Fichas</span>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <div className="max-w-6xl mx-auto p-6">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-amber-400 mb-2">Salas de Poker</h1>
          <p className="text-gray-300">Escolha uma mesa para jogar Texas Hold'em</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {rooms.map(room => (
            <div 
              key={room.id} 
              className="bg-gray-800 rounded-lg p-4 border border-amber-400 hover:border-amber-300 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-xl font-bold text-amber-400">{room.name}</h2>
                  <p className="text-xs text-gray-400">ID: {room.id}</p>
                </div>
                <span className="bg-green-700 text-xs px-2 py-1 rounded">
                  {room.players}/{room.maxPlayers} jogadores
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <p className="text-gray-400 text-sm">Blinds</p>
                  <p className="font-medium">{room.blinds}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Buy-in</p>
                  <p className="font-medium">${room.buyIn.toLocaleString()}</p>
                </div>
              </div>
              
              <button 
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-4 rounded transition-colors"
                onClick={() => joinRoom(room.id)}
              >
                Entrar
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-amber-400 mb-4">Criar Nova Sala</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Nome da Sala</label>
              <input
                type="text"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                placeholder="Ex: Mesa dos Campeões"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-1">Blinds</label>
                <select
                  value={newRoomBlinds}
                  onChange={(e) => setNewRoomBlinds(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                >
                  <option value="10/20">10/20</option>
                  <option value="25/50">25/50</option>
                  <option value="50/100">50/100</option>
                  <option value="100/200">100/200</option>
                  <option value="200/400">200/400</option>
                  <option value="500/1000">500/1000</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-1">Buy-in Mínimo</label>
                <select
                  value={newRoomBuyIn}
                  onChange={(e) => setNewRoomBuyIn(Number(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                >
                  <option value={1000}>$1,000</option>
                  <option value={2000}>$2,000</option>
                  <option value={5000}>$5,000</option>
                  <option value={10000}>$10,000</option>
                  <option value={20000}>$20,000</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={createRoom}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-4 rounded transition-colors mt-4"
            >
              Criar Sala e Jogar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokerRooms;