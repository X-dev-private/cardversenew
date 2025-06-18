export default function Card({ card = null, revealed = false }) {
  const isRedCard = card && (card.suit === '♥' || card.suit === '♦');

  return (
    <div className={`
      relative w-6 h-8 md:w-7 md:h-9 rounded-xs shadow-xs
      flex flex-col items-center justify-between overflow-hidden
      border ${revealed ? 'border-gray-200 bg-white' : 'border-blue-800 bg-blue-900'}
      transition-all duration-200 text-[6px]
    `}>
      {revealed && card ? (
        <>
          <div className={`absolute top-0 left-0 font-bold pl-0.5 ${isRedCard ? 'text-red-500' : 'text-black'}`}>
            {card.rank.length > 1 ? 'T' : card.rank} {/* Abrevia 10 para T */}
          </div>
          <div className={`text-xs ${isRedCard ? 'text-red-500' : 'text-black'} mt-0.5`}>
            {card.suit}
          </div>
          <div className={`absolute bottom-0 right-0 rotate-180 font-bold pr-0.5 ${isRedCard ? 'text-red-500' : 'text-black'}`}>
            {card.rank.length > 1 ? 'T' : card.rank}
          </div>
        </>
      ) : (
        <div className="absolute inset-0 bg-blue-900 flex items-center justify-center">
          <div className="w-full h-full bg-blue-800 opacity-30"></div>
        </div>
      )}
    </div>
  );
}