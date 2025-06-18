import { useState } from 'react'

export default function PokerHomepage() {
  const [showRules, setShowRules] = useState(false)

  const pokerVariants = [
    { id: 1, name: 'Texas Holdem', icon: '♠️', description: 'A variante mais popular de Poker' },
    { id: 2, name: 'Omaha', icon: '♥️', description: '4 cartas privadas, mais ação' },
    { id: 3, name: '7-Card Stud', icon: '♦️', description: 'Clássico sem cartas comunitárias' },
    { id: 4, name: '5-Card Draw', icon: '♣️', description: 'O Poker tradicional' },
    { id: 5, name: 'Short Deck', icon: '🃁', description: 'Poker acelerado com menos cartas' },
    { id: 6, name: 'PLO', icon: '🎴', description: 'Omaha Pot Limit - alta volatilidade' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">💰</span>
            <h1 className="text-2xl font-bold">CardVerse Poker</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:text-yellow-400 transition font-medium">Início</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition font-medium">Torneios</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition font-medium">Ranking</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition font-medium">Promoções</a></li>
            </ul>
          </nav>
          <div className="flex space-x-4">
            <button className="bg-transparent hover:bg-white/10 border border-white font-medium px-4 py-2 rounded-lg transition">
              Cadastre-se
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg transition">
              Entrar
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-yellow-500/20 border border-yellow-500 rounded-full px-4 py-1 mb-4">
            <span className="text-yellow-400 font-medium">NOVO: Torneio de Domingo $10K GTD</span>
          </div>
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
            A Melhor Sala de Poker Online
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-10 text-gray-300">
            Jogue Poker online com jogadores de todo o mundo. Dinheiro real ou diversão, sua escolha!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-lg text-lg transition transform hover:scale-105">
              Jogar Texas Hold'em
            </button>
            <button 
              className="bg-transparent hover:bg-white/10 border-2 border-white font-bold px-8 py-4 rounded-lg text-lg transition transform hover:scale-105"
              onClick={() => setShowRules(!showRules)}
            >
              {showRules ? 'Fechar Regras' : 'Ver Regras Básicas'}
            </button>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      {showRules && (
        <section className="container mx-auto px-4 py-8 bg-black/30 rounded-xl max-w-4xl mb-12 animate-fadeIn">
          <h3 className="text-2xl font-bold mb-4 text-yellow-400">Regras Básicas do Texas Hold'em</h3>
          <ul className="space-y-3 text-gray-300">
            <li>• Cada jogador recebe 2 cartas fechadas</li>
            <li>• 5 cartas comunitárias são reveladas em 3 etapas (Flop, Turn, River)</li>
            <li>• O objetivo é fazer a melhor mão de 5 cartas usando suas cartas e as comunitárias</li>
            <li>• As apostas ocorrem em rodadas antes e após cada revelação de cartas</li>
            <li>• A hierarquia de mãos: Royal Flush > Straight Flush > Quadra > Full House > Flush > Sequência > Trinca > Dois Pares > Par > Carta Alta</li>
          </ul>
        </section>
      )}

      {/* Variants Section */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold mb-8 text-center">Variantes de Poker</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pokerVariants.map(variant => (
            <div 
              key={variant.id}
              className="bg-gray-800/50 hover:bg-gray-700/60 border border-gray-700 rounded-xl p-6 transition-all hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="text-4xl mb-4 text-yellow-400">{variant.icon}</div>
              <h4 className="text-xl font-bold mb-2">{variant.name}</h4>
              <p className="text-gray-300 mb-4">{variant.description}</p>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 rounded-lg transition">
                Jogar {variant.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Tournament Banner */}
      <section className="bg-gradient-to-r from-yellow-600 to-yellow-800 py-8 my-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">Torneio Relâmpago às 20h</h3>
          <p className="mb-4">Buy-in: $10 | Prize Pool: $5,000 | 500 lugares</p>
          <button className="bg-black hover:bg-gray-900 text-yellow-400 font-bold px-8 py-3 rounded-lg transition">
            Inscreva-se Agora
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 py-8 mt-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-2xl">🃏</span>
              <h5 className="text-xl font-bold">CardVerse Poker</h5>
            </div>
            <div className="text-center md:text-right">
              <p className="text-white/70">© 2023 CardVerse. Jogo para maiores de 18 anos.</p>
              <p className="text-white/50 text-sm mt-1">Jogue com responsabilidade.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}