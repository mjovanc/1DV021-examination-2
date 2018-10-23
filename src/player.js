/**
 * Player module.
 *
 * @module src/player
 * @author Marcus Cvjeticanin
 * @version 1.0
 */

function Player (name, stopValue) {
  this.name = name
  this.hand = []
  this.stopValue = stopValue
}

Player.prototype.insertCard = function (card) {
  this.hand.push(card)
}

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
