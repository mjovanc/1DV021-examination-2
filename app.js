'use strict'

const Game = require('./src/game')
const Deck = require('./src/deck')
const Player = require('./src/player')

let game = new Game('21', 10)
let deck = new Deck()
let dealer = new Player('Dealer', 18)

let players = []
for (let i = 0; i < game.players; i++) {
  //let randomNumber = Math.floor(Math.random() * 11) + 8
  let randomNumber = 18
  players[i] = new Player('Player #' + (i + 1), randomNumber)
}

while (game.isRunning) {
  //console.log('Running game.')
  // Starting with a shuffle of the deck to have a random order
  deck.shuffle(deck.cards)
  //console.log('Shuffling cards.')

  // Going through all the players
  for (let a = 0; a < players.length; a++) {
    let satisfied = undefined
    // Going through all the possible cards the player can take (5)
    for (let b = 0; b < 4; b++) {
      if (deck.cards < 2) {
        // adding the existing card to the throwedCards array
        deck.throwedCards.push(deck.cards) // fungerar ej att slänga?
        deck.shuffle(deck.throwedCards)
        players[a].insertCard(deck.getCard(deck.throwedCards))
      } else {
        players[a].insertCard(deck.getCard(deck.cards))
      }

      // Defining variables for readability
      let playerTotalValueOfCards = players[a].totalValueOfCards
      let playerAmountOfCards = players[a].cards.length
      let playerCards = players[a].cards
      let playerStopValue = players[a].stopValue
      let playerName = players[a].name

      if (playerTotalValueOfCards <= 21) {
        if (playerAmountOfCards === 2) {

          if (playerTotalValueOfCards >= playerStopValue) {
            satisfied = true
          }
        } else if (playerAmountOfCards > 2) {

          if (playerTotalValueOfCards >= playerStopValue) {
            satisfied = true
          }
        } else if (playerTotalValueOfCards === 21) {
          game.playerWins(playerName, playerCards, playerTotalValueOfCards, dealer.name)
          deck.throwedCards.push(playerCards)
          break
        }
      } else {
        game.dealerWins(playerName, playerCards, playerTotalValueOfCards, dealer.name, dealer.cards, dealer.totalValueOfCards)
        deck.throwedCards.push(playerCards)
        deck.throwedCards.push(dealer.cards)
        break
      }
    }
  }
  // end the game
  game.isRunning = false
}
