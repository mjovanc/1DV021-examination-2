'use strict'

class Game {
  constructor (name, players) {
    this.name = name
    this.players = players
    this.running = undefined
  }

  running () {
    if (players > 0) {
      this.running = true
    } else {
      this.running = false
    }
  }

  playerWins (playerName, playerCards, dealerName) {
    console.log(
      `${playerName}: ${playerCards.toString()} (${playerCards.totalValueOfCards})
      \n${dealerName}: -
      \nPlayer wins!`
    )
  }

  dealerWins (playerName, playerCards, dealerName, dealerCards) {
    console.log(
      `${playerName}: ${playerCards.toString()} (${playerCards.totalValueOfCards})
      \n${dealerName}: ${dealerCards.toString()} (${dealerCards.totalValueOfCards})
      \nPlayer wins!`
    )
  }
}

module.exports = Game