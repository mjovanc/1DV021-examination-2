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
    this.throwedCards = []
    this.values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King']
    this.suits = ['♦', '♠', '♣', '♥']

    for (let suit in this.suits) {
      for (let value in this.values) {
        this.cards.push(`${this.values[value]} ${this.suits[suit]}`)
      }
    }
  }

  shuffle (cards) {
    let b = 0;

    for (let a = cards.length - 1; a > 0; a -= 1) {
      b = Math.floor(Math.random() * (a + 1))
      let temp = cards[a]
      cards[a] = cards[b]
      cards[b] = temp
    }
  }

  getCard (cards) {
    return cards.pop()
  }
}

module.exports = Deck
