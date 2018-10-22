/**
 * Player module.
 *
 * @module src/player
 * @author Marcus Cvjeticanin
 * @version 1.0
 */

function Player (name, stopValue) {
  this.name = name
  this.cards = []
  this.totalValueOfCards = undefined
  this.stopValue = stopValue
}

Player.prototype.insertCard = function (card) {
  this.cards.push(card)
}

Player.prototype.pointsOfCards = function () {
  let sum = 0
  for (let a = 0; a < this.cards.length; a++) {
    if (this.cards[a].startsWith('A')) {
      if (sum <= 7) {
        sum += 14
      } else if (sum > 7) {
        sum += 1
      }
    } else if (this.cards[a].startsWith('J')) {
      sum += 11
    } else if (this.cards[a].startsWith('Q')) {
      sum += 12
    } else if (this.cards[a].startsWith('K')) {
      sum += 13
    } else {
      let number = this.cards[a].replace(/[^0-9]/g, '')
      sum += parseInt(number)
    }
  }
  this.totalValueOfCards = sum
}

module.exports = Player
