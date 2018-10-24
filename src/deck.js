/**
 * Deck module.
 *
 * @module src/deck
 * @author Marcus Cvjeticanin
 * @version 1.0
 */

class Deck {
  constructor () {
    this.cards = []
    this.usedCards = []
    this.values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
    this.suits = ['♦', '♠', '♣', '♥']

    for (let suit in this.suits) {
      for (let value in this.values) {
        this.cards.push(`${this.values[value]} ${this.suits[suit]}`)
      }
    }
  }

  shuffle () {
    let b = 0

    for (let a = this.cards.length - 1; a > 0; a -= 1) {
      b = Math.floor(Math.random() * (a + 1))
      let temp = this.cards[a]
      this.cards[a] = this.cards[b]
      this.cards[b] = temp
    }
  }

  getCard () {
    return this.cards.pop()
  }

  throwUsedCards (cards) {
    for (let card in cards) {
      this.usedCards.push(cards[card])
    }
  }

  combineCards () {
    for (let card in this.usedCards) {
      this.cards.push(this.usedCards[card])
    }
    this.usedCards = []
  }

}

module.exports = Deck
