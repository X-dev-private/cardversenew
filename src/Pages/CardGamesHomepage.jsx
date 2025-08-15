import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ModernPokerHomepage() {
  const navigate = useNavigate();
  
  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Modern Poker
            </h1>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => navigate("/Rooms")}
          >
            Entrar no Jogo
          </motion.button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-32 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 leading-tight">
            A Nova Era do Poker Online
          </h2>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-gray-300">
            Experiência imersiva com gráficos 3D, realidade virtual e torneios exclusivos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => navigate("/Rooms")}
            >
              Jogar Agora
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => navigate("/Tournaments")}
            >
              Ver Torneios
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Floating Cards Animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="flex justify-center items-center py-12"
      >
        <div className="relative w-64 h-96">
          <motion.div 
            animate={{
              y: [0, -15, 0],
              rotate: [-5, 5, -5]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-2xl"
            style={{
              transformOrigin: 'center center'
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-bold">A♠</span>
            </div>
          </motion.div>
          <motion.div 
            animate={{
              y: [0, 15, 0],
              rotate: [5, -5, 5]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500 to-red-700 rounded-xl shadow-2xl"
            style={{
              transformOrigin: 'center center'
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-bold">K♥</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          ref={featuresRef}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h3 
            variants={itemVariants}
            className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          >
            Experiência Premium
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-8 hover:bg-gray-750 transition-all duration-300 shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">Jogadores Globais</h4>
              <p className="text-gray-300">Conecte-se com milhares de jogadores em tempo real com nosso sistema de matchmaking avançado.</p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-8 hover:bg-gray-750 transition-all duration-300 shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">Velocidade e Performance</h4>
              <p className="text-gray-300">Tecnologia de ponta para garantir a menor latência possível em suas partidas.</p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-8 hover:bg-gray-750 transition-all duration-300 shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">Torneios Exclusivos</h4>
              <p className="text-gray-300">Participe de torneios com premiações milionárias e eventos especiais semanais.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* VR Experience Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            <div className="md:w-1/2">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Poker em Realidade Virtual
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Experimente o poker como nunca antes com nosso suporte a VR. Sinta a emoção de estar em um cassino de luxo sem sair de casa.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => navigate("/VR")}
              >
                Saiba Mais
              </motion.button>
            </div>
            <div className="md:w-1/2 relative">
              <motion.div 
                animate={{
                  rotateY: [0, 15, 0, -15, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-full h-64 md:h-80 bg-gray-700 rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 opacity-70">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-900 to-purple-900 py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Pronto para a Ação?
            </h3>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Cadastre-se agora e receba bônus exclusivos para novos jogadores!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white hover:bg-gray-100 text-blue-900 font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => navigate("/Register")}
              >
                Criar Conta Grátis
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-10 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => navigate("/Rooms")}
              >
                Ver Salas
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Modern Poker</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 text-sm">
              <a href="#" className="hover:text-white transition">Termos de Serviço</a>
              <a href="#" className="hover:text-white transition">Política de Privacidade</a>
              <a href="#" className="hover:text-white transition">Suporte</a>
              <a href="#" className="hover:text-white transition">FAQ</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} Modern Poker. Jogo para maiores de 18 anos. Jogue com responsabilidade.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}