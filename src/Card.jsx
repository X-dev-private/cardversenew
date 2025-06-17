export default function Card({ card = null, revealed = false }) {
  const isRedCard = card && (card.suit === '♥' || card.suit === '♦');

  return (
    <div className={`
      relative w-14 h-20 md:w-16 md:h-22 rounded-md shadow-md
      flex flex-col items-center justify-between overflow-hidden
      border ${revealed ? 'border-gray-200 bg-white' : 'border-blue-800 bg-blue-900'}
      transition-all duration-200
    `}>
      {revealed && card ? (
        <>
          <div className={`text-xs self-start font-bold px-1 ${isRedCard ? 'text-red-500' : 'text-black'}`}>
            {card.rank}
          </div>
          <div className={`text-2xl ${isRedCard ? 'text-red-500' : 'text-black'}`}>
            {card.suit}
          </div>
          <div className={`text-xs self-end rotate-180 font-bold px-1 ${isRedCard ? 'text-red-500' : 'text-black'}`}>
            {card.rank}
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