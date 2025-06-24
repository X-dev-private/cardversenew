import Card from './Card';

const PlayerCards = ({ playerCards }) => {
  return (
    <div className="text-center mt-4">
      <h2 className="text-sm font-medium mb-1 text-gray-300">Suas Cartas</h2>
      <div className="flex justify-center gap-1">
        {playerCards.length > 0 ? (
          playerCards.map((card, index) => (
            <Card 
              key={`player-${index}`} 
              card={card} 
              revealed={true}
              size="sm"
            />
          ))
        ) : (
          <>
            <Card revealed={false} size="sm" />
            <Card revealed={false} size="sm" />
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerCards;