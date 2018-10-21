/**
 * Deck module.
 *
 * @module src/deck
 * @author Marcus Cvjeticanin
 * @version 1.0
 */


class Deck {
  constructor() {
    this.cards = []
    this.values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King']
    this.suits = ['♦', '♠', '♣', '♥']

    for (let suit in this.suits) {
        for (let value in this.values) {
          this.cards.push(`${this.values[value]} ${this.suits[suit]}`)
        }
    }
  }
}

module.exports = Deck
