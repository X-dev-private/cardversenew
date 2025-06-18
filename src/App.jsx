import { useState } from 'react'
import './App.css'
import PokerTable from './PokerTable'
import Homepage from './CardGamesHomepage'

function App() {
  const [cards, setCards] = useState([])
  const [handRank, setHandRank] = useState('')

  // Gerar 7 cartas aleatórias
  const generateCards = () => {
    const suits = ['♠', '♥', '♦', '♣']
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    
    const newCards = []
    for (let i = 0; i < 7; i++) {
      const suit = suits[Math.floor(Math.random() * suits.length)]
      const rank = ranks[Math.floor(Math.random() * ranks.length)] // Corrigido: estava usando suits.length aqui
      newCards.push({ suit, rank })
    }
    
    setCards(newCards)
    evaluatePokerHand(newCards)
  }

  // Avaliar a melhor mão de poker
  const evaluatePokerHand = (cards) => {
    if (cards.length < 5) {
      setHandRank('Não há cartas suficientes')
      return
    }

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

    // Verificar combinações em ordem de importância
    if (isRoyalFlush(cardData)) {
      setHandRank('Royal Flush')
    } else if (isStraightFlush(cardData)) {
      setHandRank('Straight Flush')
    } else if (isFourOfAKind(cardData)) {
      setHandRank('Quadra')
    } else if (isFullHouse(cardData)) {
      setHandRank('Full House')
    } else if (isFlush(cardData)) {
      setHandRank('Flush')
    } else if (isStraight(cardData)) {
      setHandRank('Sequência')
    } else if (isThreeOfAKind(cardData)) {
      setHandRank('Trinca')
    } else if (isTwoPair(cardData)) {
      setHandRank('Dois Pares')
    } else if (isOnePair(cardData)) {
      setHandRank('Par')
    } else {
      const highCard = getHighCard(cardData)
      setHandRank(`Carta Alta: ${highCard}`)
    }
  }

  // Funções auxiliares para verificar cada combinação
  const isRoyalFlush = (cards) => {
    const flushCards = getFlushCards(cards)
    if (!flushCards) return false
    
    const royalRanks = new Set(['10', 'J', 'Q', 'K', 'A'])
    const flushRanks = new Set(flushCards.map(card => card.rank))
    
    return ['10', 'J', 'Q', 'K', 'A'].every(rank => flushRanks.has(rank))
  }

  const isStraightFlush = (cards) => {
    const flushCards = getFlushCards(cards)
    if (!flushCards) return false
    
    return isStraight(flushCards)
  }

  const isFourOfAKind = (cards) => {
    const rankCounts = countRanks(cards)
    return Math.max(...Object.values(rankCounts)) >= 4
  }

  const isFullHouse = (cards) => {
    const rankCounts = countRanks(cards)
    const counts = Object.values(rankCounts).sort((a, b) => b - a)
    return counts[0] >= 3 && counts[1] >= 2
  }

  const isFlush = (cards) => {
    return !!getFlushCards(cards)
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

  const isThreeOfAKind = (cards) => {
    const rankCounts = countRanks(cards)
    return Math.max(...Object.values(rankCounts)) >= 3
  }

  const isTwoPair = (cards) => {
    const rankCounts = countRanks(cards)
    const pairs = Object.values(rankCounts).filter(count => count >= 2)
    return pairs.length >= 2
  }

  const isOnePair = (cards) => {
    const rankCounts = countRanks(cards)
    return Math.max(...Object.values(rankCounts)) >= 2
  }

  const getHighCard = (cards) => {
    const values = cards.map(card => card.value)
    const maxValue = Math.max(...values)
    return cards.find(card => card.value === maxValue).rank
  }

  // Funções utilitárias
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

  return (
    <div className="">
      <Homepage/>
      <PokerTable />
    </div>
  )
}

export default App