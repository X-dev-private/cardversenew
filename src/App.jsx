import { useState } from 'react'
import './App.css'

function App() {
  // Estado para armazenar as cartas
  const [cards, setCards] = useState([])

  // Gerar 7 cartas aleatórias
  const generateCards = () => {
    const suits = ['♠', '♥', '♦', '♣']
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    
    const newCards = []
    for (let i = 0; i < 7; i++) {
      const suit = suits[Math.floor(Math.random() * suits.length)]
      const rank = ranks[Math.floor(Math.random() * suits.length)]
      newCards.push({ suit, rank })
    }
    
    setCards(newCards)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Baralho de Cartas</h1>
      
      <div className="flex justify-center mb-8">
        <button 
          onClick={generateCards}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Gerar 7 Cartas
        </button>
      </div>

      {/* Container das cartas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div 
            key={index}
            className={`relative w-32 h-48 rounded-lg shadow-md p-4 flex flex-col items-center justify-between
              ${card.suit === '♥' || card.suit === '♦' ? 'text-red-500' : 'text-black'}
              bg-white border-2 border-gray-200 transform hover:scale-105 transition-transform`}
          >
            <div className="text-2xl self-start">{card.rank}</div>
            <div className="text-5xl">{card.suit}</div>
            <div className="text-2xl self-end rotate-180">{card.rank}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App