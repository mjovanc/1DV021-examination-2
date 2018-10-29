/**
 * Game module.
 *
 * @module src/game
 * @author Marcus Cvjeticanin
 * @version 1.0
 */

'use strict'

const Player = require('./Player')
const Deck = require('./Deck')
const utils = require('./utils')

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
    this._players = []
    this.stats = {playersWon: 0, dealerWon: 0, playersBusted: 0, dealerBusted: 0}
    this.isRunning = true
  }


  /**
   * Start the game
   */
  start () {
    while (this.isRunning) {
      this.createPlayers()
      deck.shuffle()
    
      for (let a = 0; a < this._players.length; a++) {
        for (let b = 0; b < 4; b++) {
          this.getCard(this._players[a])

          // Defining variables for readability
          let numberOfCards = this._players[a].hand.length
          let stopValue = this._players[a].stopValue
          let totalValueOfHand = this._players[a].totalValueOfHand()

          if (totalValueOfHand < 21) {
            
            if (numberOfCards >= 2 && numberOfCards < 5) {
              if (totalValueOfHand >= stopValue) {
                this.dealerPlays(this._players[a])
                break
              }
            } else if (numberOfCards == 5) {
              this.dealerPlays(this._players[a])
              break
            }

          } else if (totalValueOfHand > 21) {
            this.playerLost(this._players[a], dealer, true)
            break
          } else if (totalValueOfHand == 21) {
            this.playerWon(this._players[a], dealer, false)
            break
          }
    
        }
        // Getting rid of used cards
        deck.throwUsedCards(this._players[a].hand)
        this._players[a].hand = []
      }
      this.statistics()
      this.isRunning = false
    }
  }


  /**
   * Calls method playerLost() or playerWon() depending on the dealers hand.
   * @param {Object} player - The player object
   */
  dealerPlays (player) {
    utils.checkPlayer(player)

    for (let a = 0; a < 4; a++) {
      this.getCard(dealer)

      // Defining variables for readability
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


  /**
   * Creates new player objects
   */
  createPlayers () {
    for (let a = 0; a < this.numberOfPlayers; a++) {
      let stopValue = 8
      this._players[a] = new Player('Player #' + (a + 1), stopValue)
    }
  }
  

  /**
   * Inserting cards to a player objects hand.
   * @param {Object} object - The player object
   */
  getCard (object) {
    utils.checkPlayer(object)

    if (deck.cards.length < 2) {
      deck.combineCards()
      deck.shuffle()
      object.insertCard(deck.card)
    } else {
      object.insertCard(deck.card)
    }
  }


  /**
   * Prints out text to the console that the player has won.
   * @param {Object} player - The player object
   * @param {Object} dealer - The dealer object
   * @param {Boolean} busted - True or false
   */
  playerWon(player, dealer, busted) {
    utils.checkPlayer(player)
    utils.checkPlayer(dealer)

    this.stats.playersWon += 1
    
    let output = ''
    if (busted) {
      this.stats.dealerBusted += 1
      output = (
        player.name + ': ' + player.hand.join(', ') + ' (' + player.totalValueOfHand() + ')\n' +
        dealer.name + ': ' + dealer.hand.join(', ') + ' (' + dealer.totalValueOfHand() + ')' + ('\x1b[31m' + ' BUSTED!\n') +
        ('\x1b[42m' + player.name + ' wins!\n')
      )
    } else {
      if (dealer.hand.length < 1) {
        output = (
          player.name + ': ' + player.hand.join(', ') + ' (' + player.totalValueOfHand() + ')\n' +
          dealer.name + ': ' + dealer.hand.join(', ') + '-\n' +
          ('\x1b[42m' + player.name + ' wins!\n')
        )
      } else {
        output = (
          player.name + ': ' + player.hand.join(', ') + ' (' + player.totalValueOfHand() + ')\n' +
          dealer.name + ': ' + dealer.hand.join(', ') + ' (' + dealer.totalValueOfHand() + ')\n' +
          ('\x1b[42m' + player.name + ' wins!\n')
        )
      }
    }
    console.log(output)
  }


  /**
   * Prints out text to the console that the dealer has won..
   * @param {Object} player - The player object
   * @param {Object} dealer - The dealer object
   * @param {Boolean} busted - True or false
   */
  playerLost(player, dealer, busted) {
    utils.checkPlayer(player)
    utils.checkPlayer(dealer)

    this.stats.dealerWon += 1
    
    let output = ''
    if (busted) {
      this.stats.playersBusted += 1
      output = (
        player.name + ': ' + player.hand.join(', ') + ' (' + player.totalValueOfHand() + ')' + ('\x1b[31m' + ' BUSTED!\n') +
        dealer.name + ': ' + dealer.hand.join(', ') + '-\n' +
        ('\x1b[41m' + dealer.name + ' wins!\n')
      )
    } else {
      output = (
        player.name + ': ' + player.hand.join(', ') + ' (' + player.totalValueOfHand() + ')\n' +
        dealer.name + ': ' + dealer.hand.join(', ') + ' (' + dealer.totalValueOfHand() + ')\n' +
        ('\x1b[41m' + dealer.name + ' wins!\n')
      )
    }
    console.log(output)
  }


  /**
   * Displaying stats of the game
   * @memberof Game
   */
  statistics () {
    console.log('STATISTICS OF GAME\n')
    for (let s in this.stats) {
      console.log(s + ': ' + this.stats[s])
    }
  }

}


module.exports = Game
