import Card from './Card';

const CommunityCards = ({ communityCards, revealedCount }) => {
  return (
    <div className="text-center">
      <h2 className="text-sm font-medium mb-1 text-gray-300">Cartas Comunitárias</h2>
      <div className="flex justify-center gap-1">
        {communityCards.map((card, index) => (
          <Card
            key={`community-${index}`}
            card={card}
            revealed={index < revealedCount}
            size="sm"
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityCards;