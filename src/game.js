'use strict'

const Player = require('./player')
const Deck = require('./deck')

class Game {
  constructor (numberOfPlayers) {
    this.numberOfPlayers = numberOfPlayers
    this.players = []
    this.dealer = new Player('Dealer', 18)
    this.deck = new Deck()
    this.isRunning = true
  }

  start () {
    while (this.isRunning) {
      this.createPlayers()
      
      this.deck.shuffle()
    
      for (let a = 0; a < this.players.length; a++) {
        for (let b = 0; b < 4; b++) {
          // Defining variables for readability
          let deck = this.deck
          let player = this.players[a]
    
          // Gives card to hand
          if (deck.cards.length < 2) {
            deck.combineCards()
            deck.shuffle()
            player.insertCard(deck.getCard())
          } else {
            player.insertCard(deck.getCard())
          }

          // Defining variables for readability
          let numberOfCards = player.hand.length
          let stopValue = player.stopValue
          let totalValueOfHand = player.totalValueOfHand()
  
          // Check of the players hand
          if (totalValueOfHand > 21) {
            this.playerLost(player, this.dealer)
            break
          } else if (totalValueOfHand < 21) {
            
            if (numberOfCards > 2) {
              // if the player is satisfied
              if (totalValueOfHand >= stopValue) {
                //this.dealerAgainstPlayer(this.players[a])
                //console.log('Satisfied and more cards than 2.\n')
                this.dealerPlays(player)
                break
              }
            } else if (numberOfCards === 2) {
              // if the player is satisfied
              if (totalValueOfHand >= stopValue) {
                //console.log('Satisfied and cards equal to 2.\n')
                this.dealerPlays(player)
                break
              }
              // Maybe dont need: 5 && players[a].totalValueOfHand() < 21
            } else if (numberOfCards === 5 && totalValueOfHand < 21) {
              this.playerWon(player, this.dealer)
              break
            }
    
          } else if (totalValueOfHand === 21) {
            this.playerWon(player, this.dealer)
            break
          }
    
        }
        this.deck.throwUsedCards(this.players[a].hand)
      }
      this.isRunning = false
    }
  }

  dealerPlays (player) {
    for (let i = 0; i < 4; i++) {
      
      if (this.deck.cards.length < 2) {
        this.deck.combineCards()
        this.deck.shuffle()
        this.dealer.insertCard(this.deck.getCard())
      } else {
        this.dealer.insertCard(this.deck.getCard())
      }

      if (this.dealer.totalValueOfHand() > 21) {
        this.playerWon(player, this.dealer)
        break;
      } else if (this.dealer.totalValueOfHand() === 21) {
        this.playerLost(player, this.dealer)
        break;
      } else if (this.dealer.totalValueOfHand() >= this.dealer.stopValue) {
        if (this.dealer.totalValueOfHand() > player.totalValueOfHand()) {
          this.playerLost(player, this.dealer)
          break;
        }
      }
    }
  }

  createPlayers () {
    for (let i = 0; i < this.numberOfPlayers; i++) {
      //let randomNumber = Math.floor((Math.random() * 11) + 8)
      this.players[i] = new Player('Player #' + (i + 1), 10)
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
      player.name + ': ' + player.hand.join(', ') + ' (' + player.totalValueOfHand() + ') BUSTED!\n' +
      dealer.name + ': ' + dealer.hand.join(', ') + ' (' + dealer.totalValueOfHand() + ')\n' +
      dealer.name + ' wins!\n'
    )
  }

}

module.exports = Game
