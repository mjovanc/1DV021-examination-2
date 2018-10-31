/**
 * Deck module.
 *
 * @module src/deck
 * @author Marcus Cvjeticanin
 * @version 1.1
 */

'use strict'

const utils = require('./utils')

/**
 * Class representing a deck.
 */
class Deck {
  constructor () {
    this._cards = []
    this._usedCards = []
    let values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
    let suits = ['♦', '♠', '♣', '♥']

    for (let suit in suits) {
      for (let value in values) {
        this._cards.push(`${values[value]} ${suits[suit]}`)
      }
    }
  }

  /**
   * Shuffles the cards array by using the Fisher-Yates Shuffle algorithm.
   */
  shuffle () {
    let b = 0

    for (let a = this._cards.length - 1; a > 0; a -= 1) {
      b = Math.floor(Math.random() * (a + 1))
      let temp = this._cards[a]
      this._cards[a] = this._cards[b]
      this._cards[b] = temp
    }
  }

  /**
   * Getting the cards
   * @returns {Array<String>}
   */
  get cards () {
    return this._cards
  }

  /**
   * Getting a card from cards.
   * @return {String}
   */
  get card () {
    return this._cards.pop()
  }

  /**
   * Pushing array elements into usedCards.
   * @param {Array<String>} cards
   */
  throwUsedCards (cards) {
    utils.checkArray(cards)

    for (let card in cards) {
      this._usedCards.push(cards[card])
    }
  }

  /**
   * Pushing array elements from usedCards to cards.
   */
  combineCards () {
    for (let card in this._usedCards) {
      this._cards.push(this._usedCards[card])
    }
    this._usedCards = []
  }
}

module.exports = Deck
