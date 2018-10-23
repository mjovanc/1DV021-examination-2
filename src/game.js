'use strict'

const Player = require('./player')
const Deck = require('./deck')

class Game {
  constructor (numberOfPlayers) {
    this.numberOfPlayers = numberOfPlayers
    this.players = []
    this.isRunning = true
  }

  createPlayers () {
    for (let i = 0; i < this.numberOfPlayers; i++) {
      //let randomNumber = Math.floor((Math.random() * 11) + 8)
      this.players[i] = new Player('Player #' + (i + 1), 8)
    }
  }

  start () {
    while (this.isRunning) {
      let deck = new Deck()
      let dealer = new Player('Dealer', 18)
      this.createPlayers()
      
      deck.shuffle(deck.cards)
    
      for (let a = 0; a < this.players.length; a++) {
        let satisfied = undefined
        for (let b = 0; b < 4; b++) {
    
          if (deck.cards.length < 2) {
            deck.combineCards()
            deck.shuffle(deck.cards)
            this.players[a].insertCard(deck.getCard(deck.cards))
          } else {
            this.players[a].insertCard(deck.getCard(deck.cards))
          }
    
    
          if (this.players[a].totalValueOfHand() > 21) {
            this.playerLost(this.players[a], dealer)
          } else if (this.players[a].totalValueOfHand() < 21) {
            
            if (this.players[a].hand.length > 2) {
              console.log('More than 2 cards in hand.\n')
            } else if (this.players[a].hand.length === 2) {
              console.log('Equal to two cards in hand.\n')
            } else if (this.players[a].hand.length === 5 && players[a].totalValueOfHand() < 21) {
              this.playerWon(this.players[a], dealer)
            }
    
          } else if (this.players[a].totalValueOfHand() === 21) {
            this.playerWon(this.players[a], dealer)
          }
    
        }
        deck.throwUsedCards(this.players[a].hand)
      }
      this.isRunning = false
    }
  }

  playerWon(player, dealer) {
    console.log(
      player.name + ': ' + player.hand.join(', ') + ' (' + player.totalValueOfHand() + ')\n' +
      dealer.name + ': ' + dealer.hand.join(', ') + ' (' + dealer.totalValueOfHand() + ')\n' +
      player.name + ' wins!\n'
    )
  }

  playerLost(player, dealer) {
    console.log(
      player.name + ': ' + player.hand.join(', ') + ' (' + player.totalValueOfHand() + ')\n' +
      dealer.name + ': ' + dealer.hand.join(', ') + ' (' + dealer.totalValueOfHand() + ')\n' +
      dealer.name + ' wins!\n'
    )
  }

}

module.exports = Game
