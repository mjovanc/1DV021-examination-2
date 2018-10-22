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

module.exports = Player