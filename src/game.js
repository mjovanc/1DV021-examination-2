'use strict'

class Game {
  constructor (name, players) {
    this.name = name
    this.players = players
    this.isRunning = true
  }

  playerWins (playerName, playerCards, playerValueOfCards, dealerName) {
    console.log(
      playerName + ': ' + playerCards.join(', ') + '(' + playerValueOfCards + ')\n' +
      dealerName + ': -\n' +
      playerName + ' wins!\n'
    )
  }

  dealerWins (playerName, playerCards, playerValueOfCards, dealerName, dealerCards, dealerValueOfCards) {
    console.log(
      playerName + ': ' + playerCards.join(', ') + ' (' + playerValueOfCards + ')\n' +
      dealerName + ': ' + dealerCards.join(', ') + ' (' + dealerValueOfCards + ')\n' +
      dealerName + ' wins!\n'
    )
  }
}

module.exports = Game
