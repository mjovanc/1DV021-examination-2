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

module.exports = Player