export default function PokerTableSurface({ children, header, chips, onReset }) {
  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden bg-gray-900 flex flex-col">
      {/* Header minimalista */}
      <div className="w-full max-w-8xl mx-auto mb-2 flex justify-between items-center z-20 px-2">
        <div className="text-2xl font-bold text-amber-400 drop-shadow-lg">
          {header}
        </div>
        
        <button 
          onClick={onReset}
          className="bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 
            text-white font-bold py-2 px-5 rounded-lg transition-all shadow-md hover:shadow-lg
            border-2 border-red-700 flex items-center text-sm md:text-base"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 md:h-5 md:w-5 md:mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Reiniciar
        </button>
      </div>

      {/* Container principal com altura generosa */}
      <div className="flex-1 flex flex-col relative w-full max-w-8xl mx-auto" style={{ minHeight: '80vh' }}>
        {/* Mesa de poker com grande altura vertical */}
        <div className="flex-1 relative rounded-t-3xl overflow-hidden" style={{ height: 'calc(100% - 6rem)' }}>
          {/* Feltro da mesa com gradiente vertical */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b6d3d] to-[#083b20]">
            <div className="absolute inset-0 opacity-90" style={{
              backgroundImage: `
                radial-gradient(ellipse at center, rgba(30,150,80,0.5) 0%, transparent 70%),
                repeating-linear-gradient(0deg, rgba(50,170,90,0.15) 0px, rgba(50,170,90,0.15) 2px, transparent 2px, transparent 4px)
              `,
              backgroundSize: 'cover, 20px 20px'
            }}></div>
            
            {/* Área central ampla para cartas comunitárias */}
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              w-5/6 h-48 flex justify-center items-center space-x-2 md:space-x-4 z-10">
              {/* Espaço para o HandGenerator */}
            </div>

            {/* Centro decorativo menor */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              w-36 h-36 rounded-full border-6 border-amber-500/90 flex items-center justify-center">
              <div className="text-4xl text-amber-300/90 font-bold">♠</div>
            </div>

            {/* Posições dos jogadores (layout oval) */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((pos) => (
              <div 
                key={pos}
                className="absolute w-14 h-14 bg-[#0a5c36]/90 rounded-full border-3 border-amber-600 
                  shadow-md flex items-center justify-center hover:scale-110 transition-transform"
                style={{
                  top: `${50 + 45 * Math.sin(pos * Math.PI/4)}%`,
                  left: `${50 + 35 * Math.cos(pos * Math.PI/4)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
              </div>
            ))}

            {/* Área de fichas flutuante */}
            <div className="absolute top-3 right-3 z-10 bg-amber-900/80 p-2 rounded-lg 
              text-center border border-amber-500 shadow-md min-w-[110px] backdrop-blur-sm">
              <p className="text-amber-200 text-xs uppercase tracking-wider">Fichas</p>
              <p className="text-yellow-200 font-bold text-lg font-mono">
                ${chips.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Borda da mesa com efeito 3D */}
          <div className="absolute inset-0 border-[14px] border-[#5a2c0d] rounded-t-3xl pointer-events-none">
            <div className="absolute inset-0 border-[5px] border-amber-800/70 rounded-xl"></div>
          </div>

          {/* Área para o HandGenerator - centralizada */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl z-20 px-4">
            {children.find(child => child.type?.name === 'HandGenerator')}
          </div>

          {/* Área de apostas SEM FUNDO - integrada à mesa */}
          <div className="absolute bottom-0 left-0 right-0 h-20 flex items-center justify-center px-4 z-10">
            <div className="w-full max-w-3xl mx-auto">
              {children.filter(child => child.type?.name !== 'HandGenerator')}
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé minimalista */}
      <div className="w-full max-w-8xl mx-auto mt-4 flex justify-center items-center 
        text-gray-400 text-xs py-2">
        <div className="flex items-center space-x-3">
          <span className="text-amber-400">TEXAS HOLDEM</span>
          <div className="flex space-x-1">
            <span className="text-gray-300">♠</span>
            <span className="text-red-400">♥</span>
            <span className="text-red-400">♦</span>
            <span className="text-gray-300">♣</span>
          </div>
        </div>
      </div>

      {/* Efeito de iluminação suave */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)'
      }}></div>
    </div>
  )
}