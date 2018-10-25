'use strict'

/**
 * Game module.
 *
 * @module src/game
 * @author Marcus Cvjeticanin
 * @version 1.0
 */

const Player = require('./player')
const Deck = require('./deck')

let dealer = new Player('Dealer', 8)
let deck = new Deck()

/**
 * Class representing a game.
 */
class Game {
  /**
   * Create a game
   * @param {Number} numberOfPlayers - Number of players to create
   */
  constructor (numberOfPlayers) {
    this.numberOfPlayers = numberOfPlayers
    this.players = []
    this.isRunning = true
  }

  /**
   * Start the game
   */
  start () {
    while (this.isRunning) {
      this.createPlayers()
      deck.shuffle()
    
      for (let a = 0; a < this.players.length; a++) {
        for (let b = 0; b < 4; b++) {
          this.getCard(this.players[a])

          let numberOfCards = this.players[a].hand.length
          let stopValue = this.players[a].stopValue
          let totalValueOfHand = this.players[a].totalValueOfHand()

          if (totalValueOfHand < 21) {
            
            if (numberOfCards >= 2 && numberOfCards < 5) {
              if (totalValueOfHand >= stopValue) {
                this.dealerPlays(this.players[a])
                break
              }
            } else if (numberOfCards == 5) {
              this.dealerPlays(this.players[a])
              break
            }

          } else if (totalValueOfHand > 21) {
            this.playerLost(this.players[a], dealer, true)
            break
          } else if (totalValueOfHand == 21) {
            this.playerWon(this.players[a], dealer, false)
            break
          }
    
        }
        // Copying used cards to new array and sets a new array
        deck.throwUsedCards(this.players[a].hand)
        this.players[a].hand = []
      }
      this.isRunning = false
    }
  }

  /**
   * Calls method playerLost or playerWon depending on the dealers hand.
   * @param {Object} player - The player object
   * @callback
   */
  dealerPlays (player) {

    for (let i = 0; i < 4; i++) {
      this.getCard(dealer)

      let dealerTotalValueOfHand = dealer.totalValueOfHand()
      let numberOfCards = dealer.hand.length

      if (dealerTotalValueOfHand < 21) {
            
        if (numberOfCards >= 2) {
          if (dealerTotalValueOfHand >= dealer.stopValue) {
            if (dealerTotalValueOfHand > player.totalValueOfHand()) {
              this.playerLost(player, dealer, false)
              break
            } else if (dealerTotalValueOfHand == player.totalValueOfHand()) {
              this.playerLost(player, dealer, false)
              break
            } else if (dealerTotalValueOfHand < player.totalValueOfHand()) {
              this.playerWon(player, dealer, false)
              break
            }
          }
        }

      } else if (dealerTotalValueOfHand > 21) {
        this.playerWon(player, dealer, true)
        break
      } else if (dealerTotalValueOfHand == 21) {
        this.playerLost(player, dealer, false)
        break
      }
      
    }
    // Getting rid of used cards
    deck.throwUsedCards(dealer.hand)
    dealer.hand = []
  }

  createPlayers () {
    for (let i = 0; i < this.numberOfPlayers; i++) {
      let stopValue = 8
      this.players[i] = new Player('Player #' + (i + 1), stopValue)
    }
  }
  
  getCard (object) {
    if (deck.cards.length < 2) {
      deck.combineCards()
      deck.shuffle()
      object.insertCard(deck.getCard())
    } else {
      object.insertCard(deck.getCard())
    }
  }

  playerWon(player, dealer, busted) {
    let output = ''
    if (busted) {
      output = (
        player.name + ': ' + player.hand.join(', ') + ' (' + player.totalValueOfHand() + ')\n' +
        dealer.name + ': ' + dealer.hand.join(', ') + ' (' + dealer.totalValueOfHand() + ') BUSTED!\n' +
        player.name + ' wins!\n'
      )
    } else {
      if (dealer.hand.length < 1) {
        output = (
          player.name + ': ' + player.hand.join(', ') + ' (' + player.totalValueOfHand() + ')\n' +
          dealer.name + ': ' + dealer.hand.join(', ') + '-\n' +
          player.name + ' wins!\n'
        )
      } else {
        output = (
          player.name + ': ' + player.hand.join(', ') + ' (' + player.totalValueOfHand() + ')\n' +
          dealer.name + ': ' + dealer.hand.join(', ') + ' (' + dealer.totalValueOfHand() + ')\n' +
          player.name + ' wins!\n'
        )
      }
    }
    console.log(output)
  }

  playerLost(player, dealer, busted) {
    let output = ''
    if (busted) {
      output = (
        player.name + ': ' + player.hand.join(', ') + ' (' + player.totalValueOfHand() + ') BUSTED!\n' +
        dealer.name + ': ' + dealer.hand.join(', ') + '-\n' +
        dealer.name + ' wins!\n'
      )
    } else {
      output = (
        player.name + ': ' + player.hand.join(', ') + ' (' + player.totalValueOfHand() + ')\n' +
        dealer.name + ': ' + dealer.hand.join(', ') + ' (' + dealer.totalValueOfHand() + ')\n' +
        dealer.name + ' wins!\n'
      )
    }
    console.log(output)
  }

}

module.exports = Game
