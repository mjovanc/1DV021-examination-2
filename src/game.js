'use strict'

class Game {
  constructor (name, players) {
    this.name = name
    this.players = players
    this.isRunning = true
  }

  playerWins (playerName, playerCards, dealerName) {
    console.log(
      `${playerName}: ${playerCards} (${playerCards.totalValueOfCards})
      \n${dealerName}: -
      \nPlayer wins!`
    )
  }

  dealerWins (playerName, playerCards, dealerName, dealerCards) {
    console.log(
      `${playerName}: ${playerCards} (${playerCards.totalValueOfCards})
      \n${dealerName}: ${dealerCards} (${dealerCards.totalValueOfCards})
      \nDealer wins!`
    )
  }
}

module.exports = Game
