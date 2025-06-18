import { useState } from 'react'

// Componente SVG do Coringa
const JokerIcon = ({ className = '' }) => (
  <svg className={`w-10 h-10 ${className}`} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="3" fill="white" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 8L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 8L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

// SVGs para as variantes de poker
const PokerIcons = {
  texas: (
    <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  omaha: (
    <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8" cy="8" r="2" fill="currentColor"/>
      <circle cx="16" cy="8" r="2" fill="currentColor"/>
      <circle cx="8" cy="16" r="2" fill="currentColor"/>
      <circle cx="16" cy="16" r="2" fill="currentColor"/>
    </svg>
  ),
  stud: (
    <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="7" r="2" fill="currentColor"/>
      <circle cx="7" cy="12" r="2" fill="currentColor"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
      <circle cx="17" cy="12" r="2" fill="currentColor"/>
      <circle cx="12" cy="17" r="2" fill="currentColor"/>
    </svg>
  ),
  draw: (
    <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  short: (
    <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="3" fill="currentColor"/>
    </svg>
  ),
  plo: (
    <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="white" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 6H18V18H6V6Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function PokerHomepage() {
  const pokerVariants = [
    { id: 1, name: 'Texas Holdem', icon: PokerIcons.texas, description: 'A variante mais popular de Poker' },
    { id: 2, name: 'Omaha', icon: PokerIcons.omaha, description: '4 cartas privadas, mais ação' },
    { id: 3, name: '7-Card Stud', icon: PokerIcons.stud, description: 'Clássico sem cartas comunitárias' },
    { id: 4, name: '5-Card Draw', icon: PokerIcons.draw, description: 'O Poker tradicional' },
    { id: 5, name: 'Short Deck', icon: PokerIcons.short, description: 'Poker acelerado com menos cartas' },
    { id: 6, name: 'PLO', icon: PokerIcons.plo, description: 'Omaha Pot Limit - alta volatilidade' },
  ]

  const features = [
    {
      title: "Aprenda Poker do Zero",
      description: "Domine as estratégias fundamentais do Texas Hold'em e outras variantes. Desde as regras básicas até técnicas avançadas de blefe e leitura de oponentes.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-24 h-24 text-gray-800">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      bgColor: "bg-white",
      textColor: "text-gray-800",
      reverse: false
    },
    {
      title: "Carteiras Web3 para Iniciantes",
      description: "Entenda como criar e gerenciar sua carteira digital de criptomoedas. Aprenda sobre segurança, transações e como conectar seu wallet aos jogos de poker descentralizados.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-24 h-24 text-gray-800">
          <path d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16V16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
      reverse: true
    },
    {
      title: "Jogue com Tokens Reais",
      description: "Experimente a emoção do poker com criptomoedas em um ambiente seguro. Aprenda a gerenciar seu bankroll e fazer transações instantâneas na blockchain.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-24 h-24 text-gray-800">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 14C8 14 9 16 12 16C15 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 9H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      bgColor: "bg-white",
      textColor: "text-gray-800",
      reverse: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <JokerIcon className="text-gray-800" />
            <h1 className="text-2xl font-bold">CardVerse</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:text-blue-600 transition font-medium">Início</a></li>
              <li><a href="#" className="hover:text-blue-600 transition font-medium">Aprenda Poker</a></li>
              <li><a href="#" className="hover:text-blue-600 transition font-medium">Web3 & Blockchain</a></li>
              <li><a href="#" className="hover:text-blue-600 transition font-medium">Recursos</a></li>
            </ul>
          </nav>
          <button 
            className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition"
            onClick={() => {}}
          >
            Ir para o App
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-blue-100 border border-blue-200 rounded-full px-4 py-1 mb-4">
            <span className="text-blue-600 font-medium">NOVO: Torneio com premiação em crypto</span>
          </div>
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              Poker Moderno na Web3
            </span>
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-10 text-gray-600">
            Domine as estratégias de poker enquanto explora o potencial da tecnologia blockchain em jogos descentralizados.
          </p>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg text-lg transition transform hover:scale-105"
            onClick={() => {}}
          >
            Comece Agora
          </button>
        </div>
      </section>

      {/* Features Section */}
      {features.map((feature, index) => (
        <section key={index} className={`${feature.bgColor} ${feature.textColor} py-16`}>
          <div className={`container mx-auto px-4 flex flex-col ${feature.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
            <div className="md:w-1/2 flex justify-center">
              {feature.icon}
            </div>
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
              <p className="text-xl mb-6 text-gray-600">{feature.description}</p>
              <button className={`bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition`}>
                Saiba Mais
              </button>
            </div>
          </div>
        </section>
      ))}

      {/* Variants Section */}
      <section className="container mx-auto px-4 py-12 bg-white">
        <h3 className="text-3xl font-bold mb-8 text-center">Variantes de Poker</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pokerVariants.map(variant => (
            <div 
              key={variant.id}
              className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-6 transition-all hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="w-12 h-12 mb-4 text-blue-600">
                {variant.icon}
              </div>
              <h4 className="text-xl font-bold mb-2">{variant.name}</h4>
              <p className="text-gray-600 mb-4">{variant.description}</p>
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition">
                Aprender {variant.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Web3 Benefits Section */}
      <section className="container mx-auto px-4 py-12 bg-gray-100">
        <h3 className="text-3xl font-bold mb-8 text-center">Vantagens do Poker Web3</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="w-12 h-12 mb-4 text-blue-600">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-4 text-gray-800">Provably Fair</h4>
            <p className="text-gray-600">Smart contracts verificáveis garantem que os resultados são justos e aleatórios.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="w-12 h-12 mb-4 text-blue-600">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-4 text-gray-800">True Ownership</h4>
            <p className="text-gray-600">Seus NFTs de cartas e itens são realmente seus, podendo ser vendidos ou usados em outras plataformas.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="w-12 h-12 mb-4 text-blue-600">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12.99V12.98" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.05005 10.99L11 12.99L7.05005 14.99" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.95 10.99L13 12.99L16.95 14.99" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-4 text-gray-800">Fast Payments</h4>
            <p className="text-gray-600">Depósitos e saques instantâneos sem burocracia através de criptomoedas.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6 text-white">Pronto para jogar Poker Web3?</h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Conecte sua carteira digital e comece a jogar em uma plataforma justa, transparente e descentralizada.
          </p>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg text-lg transition transform hover:scale-105"
            onClick={() => {}}
          >
            Acessar o App
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <JokerIcon className="text-white" />
              <h5 className="text-xl font-bold text-white">CardVerse</h5>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">© 2023 CardVerse. Jogo para maiores de 18 anos.</p>
              <p className="text-gray-500 text-sm mt-1">Jogue com responsabilidade.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}