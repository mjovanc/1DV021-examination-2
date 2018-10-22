'use strict'

const Game = require('./src/game')
const Deck = require('./src/deck')
const Player = require('./src/player')

let game = new Game('21', 3)
let deck = new Deck()
let dealer = new Player('Dealer', 18)

let players = []
for (let i = 0; i < game.players; i++) {
  let randomNumber = Math.floor(Math.random() * 11) + 8
  players[i] = new Player('Player #' + (i + 1), randomNumber)
}

while (game.isRunning) {
  console.log('Running game.')
  // Starting with a shuffle of the deck to have a random order
  deck.shuffle(deck.cards)
  console.log('Shuffling cards.')

  // Going through all the players
  for (let a = 0; a < players.length; a++) {
    let satisfied
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

      if (players[a].totalValueOfCards <= 21) {
        console.log('Points is lower than 21 or equal.')
        // Checking the value and how many cards the player have and do the following
        if (players[a].cards.length === 2) {
          let points = players[a].totalValueOfCards

          if (points >= players[a].stopValue) {
            satisfied = true
            console.log('Satisfied!')
          }
        } else if (players[a].cards.length > 2) {
          let points = players[a].totalValueOfCards

          if (points >= players[a].stopValue) {
            satisfied = true
            console.log('Satisfied!')
          }
        } else if (players[a].totalValueOfCards === 21) {
          console.log('Player wins!')
          game.playerWins(players[a].name, players[a].cards, dealer.name)
          deck.throwedCards.push(players[a].cards)
          break
        }
      } else {
        console.log('Points are greater than 21')
        game.dealerWins(players[a].name, players[a].cards, dealer.name, dealer.cards)
        deck.throwedCards.push(players[a].cards)
        deck.throwedCards.push(dealer.cards)
        break
      }
    }
  }
  // end the game
  game.isRunning = false
}
