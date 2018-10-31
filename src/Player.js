/**
 * Player module.
 *
 * @module src/player
 * @author Marcus Cvjeticanin
 * @version 1.1
 */

'use strict'

const utils = require('./utils')

/**
 * Represents a player
 * @constructor
 * @param {String} name - The name of the player
 * @param {Number} stopValue - The stop value for the player
 */
function Player (name, stopValue) {
  this.name = name
  this.hand = []
  this.stopValue = stopValue
}

/**
 * Push a card to the player hand array.
 * @memberof Player
 * @param {String} card - The card that will be pushed
 */
Player.prototype.insertCard = function (card) {
  this.hand.push(card)
}

/**
 * Returns the total value of the players current hand.
 * @memberof Player
 * @returns {Number} sum - The sum of the hand
 */
Player.prototype.totalValueOfHand = function () {
  let sum = 0

  for (let a = 0; a < this.hand.length; a++) {
    if (this.hand[a].startsWith('A')) {
      if (sum <= 7) {
        sum += 14
      } else if (sum > 7) {
        sum += 1
      }
    } else if (this.hand[a].startsWith('J')) {
      sum += 11
    } else if (this.hand[a].startsWith('Q')) {
      sum += 12
    } else if (this.hand[a].startsWith('K')) {
      sum += 13
    } else {
      let number = this.hand[a].replace(/[^0-9]/g, '')
      sum += parseInt(number)
    }
  }

  return sum
}

module.exports = Player
