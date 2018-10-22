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

Player.prototype.pointsOfCards = function (cards) {
  let sum = 0
  for (let a = 0; a < cards.length; a++) {
    if (cards[a].startsWith('Ace')) {
      if (sum <= 7) {
        sum += 14
      } else if (sum > 7) {
        sum += 1
      }
    } else if (cards[a].startsWith('Jack')) {
      sum += 11
    } else if (cards[a].startsWith('Queen')) {
      sum += 12
    } else if (cards[a].startsWith('King')) {
      sum += 13
    } else {
      let number = cards[a].replace(/[^0-9]/g, '')
      sum += parseInt(number)
    }
  }
  this.totalValueOfCards = sum
}

module.exports = Player
