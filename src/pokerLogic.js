// Funções de geração e avaliação de cartas
export const generateRandomCard = () => {
  const suits = ['♠', '♥', '♦', '♣']
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  
  const suit = suits[Math.floor(Math.random() * suits.length)]
  const rank = ranks[Math.floor(Math.random() * ranks.length)]
  
  return { suit, rank }
}

// Função para avaliar a força da mão
export const evaluatePokerHand = (cards) => {
  if (cards.length < 5) return 'Não há cartas suficientes'

  // Converter ranks para valores numéricos
  const rankValues = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, 
    '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
  }

  // Preparar dados das cartas
  const cardData = cards.map(card => ({
    suit: card.suit,
    rank: card.rank,
    value: rankValues[card.rank]
  }))

  // Funções auxiliares
  const countRanks = (cards) => {
    const rankCounts = {}
    cards.forEach(card => {
      rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1
    })
    return rankCounts
  }

  const getFlushCards = (cards) => {
    const suitCounts = {}
    cards.forEach(card => {
      suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1
    })
    
    const flushSuit = Object.keys(suitCounts).find(suit => suitCounts[suit] >= 5)
    if (!flushSuit) return null
    
    return cards.filter(card => card.suit === flushSuit)
  }

  const isStraight = (cards) => {
    const values = cards.map(card => card.value).sort((a, b) => a - b)
    const uniqueValues = [...new Set(values)]
    
    // Verificar sequência normal
    for (let i = 0; i <= uniqueValues.length - 5; i++) {
      if (uniqueValues[i + 4] - uniqueValues[i] === 4) {
        return true
      }
    }
    
    // Verificar sequência baixa (A-2-3-4-5)
    return uniqueValues.includes(14) && 
           uniqueValues.includes(2) && 
           uniqueValues.includes(3) && 
           uniqueValues.includes(4) && 
           uniqueValues.includes(5)
  }

  const getHighCard = (cards) => {
    const values = cards.map(card => card.value)
    const maxValue = Math.max(...values)
    return cards.find(card => card.value === maxValue).rank
  }

  // Verificar combinações em ordem de importância
  const flushCards = getFlushCards(cardData)
  
  // Royal Flush
  if (flushCards) {
    const royalRanks = new Set(['10', 'J', 'Q', 'K', 'A'])
    const flushRanks = new Set(flushCards.map(card => card.rank))
    
    if (['10', 'J', 'Q', 'K', 'A'].every(rank => flushRanks.has(rank))) {
      return 'Royal Flush'
    }
  }

  // Straight Flush
  if (flushCards && isStraight(flushCards)) {
    return 'Straight Flush'
  }

  // Four of a Kind
  const rankCounts = countRanks(cardData)
  const rankCountValues = Object.values(rankCounts)
  if (Math.max(...rankCountValues) === 4) {
    return 'Quadra'
  }

  // Full House
  const counts = Object.values(rankCounts).sort((a, b) => b - a)
  if (counts[0] >= 3 && counts[1] >= 2) {
    return 'Full House'
  }

  // Flush
  if (flushCards) {
    return 'Flush'
  }

  // Straight
  if (isStraight(cardData)) {
    return 'Sequência'
  }

  // Three of a Kind
  if (Math.max(...rankCountValues) === 3) {
    return 'Trinca'
  }

  // Two Pair
  const pairs = rankCountValues.filter(count => count >= 2)
  if (pairs.length >= 2) {
    return 'Dois Pares'
  }

  // One Pair
  if (Math.max(...rankCountValues) === 2) {
    return 'Par'
  }

  // High Card
  const highCard = getHighCard(cardData)
  return `Carta Alta: ${highCard}`
}

// Helper para nome dos estágios
export const getStageName = (stage) => {
  const names = {
    'pre-flop': 'Pré-flop',
    'flop': 'Flop',
    'turn': 'Turn',
    'river': 'River',
    'showdown': 'Showdown'
  }
  return names[stage] || stage
}