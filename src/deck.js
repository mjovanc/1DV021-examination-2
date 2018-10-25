'use strict'

/**
 * Deck module.
 *
 * @module src/deck
 * @author Marcus Cvjeticanin
 * @version 1.0
 */


/**
 * Class representing a deck.
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

  /**
   * Shuffles the cards[] array by using the Fisher-Yates Shuffle algorithm.
   */
  shuffle () {
    let b = 0

    for (let a = this.cards.length - 1; a > 0; a -= 1) {
      b = Math.floor(Math.random() * (a + 1))
      let temp = this.cards[a]
      this.cards[a] = this.cards[b]
      this.cards[b] = temp
    }
  }
  
  /**
   * Get a card from cards[].
   * @return {String}
   */
  getCard () {
    return this.cards.pop()
  }
  
  /**
   * Pushing array elements into usedCards[].
   * @param {Array<String>} cards
   */
  throwUsedCards (cards) {
    for (let card in cards) {
      this.usedCards.push(cards[card])
    }
  }
  
  /**
   * Pushing array elements from usedCards[] to cards[].
   */
  combineCards () {
    for (let card in this.usedCards) {
      this.cards.push(this.usedCards[card])
    }
    this.usedCards = []
  }

}

module.exports = Deck
