import { useNavigate } from 'react-router-dom';

export default function PokerHomepage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white font-bold">
              P
            </div>
            <h1 className="text-2xl font-bold">Poker Rooms</h1>
          </div>
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition"
            onClick={() => navigate("/Rooms")}
          >
            Go to App
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 text-gray-800">
            Bem-vindo ao Poker Online
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-10 text-gray-600">
            Jogue Texas Hold'em com jogadores de todo o mundo em tempo real.
          </p>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg text-lg transition"
            onClick={() => navigate("/Rooms")}
          >
            Comece Agora
          </button>
        </div>
      </section>

      {/* Simple Features */}
      <section className="container mx-auto px-4 py-12 bg-white">
        <h3 className="text-3xl font-bold mb-8 text-center">Por que jogar conosco?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h4 className="text-xl font-bold mb-4 text-gray-800">Jogadores Reais</h4>
            <p className="text-gray-600">Partidas contra jogadores humanos em tempo real.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h4 className="text-xl font-bold mb-4 text-gray-800">Variantes de Poker</h4>
            <p className="text-gray-600">Texas Hold'em, Omaha e outras variantes populares.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h4 className="text-xl font-bold mb-4 text-gray-800">Torneios Diários</h4>
            <p className="text-gray-600">Participe de torneios com grandes premiações.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6 text-white">Pronto para jogar?</h3>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg text-lg transition"
            onClick={() => navigate("/Rooms")}
          >
            Acessar Salas de Poker
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2023 Poker Online. Jogo para maiores de 18 anos.</p>
        </div>
      </footer>
    </div>
  )
}