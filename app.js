'use strict'

const Game = require('./src/game')
const Deck = require('./src/deck')
const Player = require('./src/player')

let game = new Game('21', 3)
let deck = new Deck()
let dealer = Player('Dealer', 18)

let players = []
for (let i = 0; i < game.players; i++) {
  let randomNumber = Math.floor(Math.random() * 11) + 8
  players[i] = new Player('Player #' + (i + 1), randomNumber)
}

while (game.running) {
  // Starting with a shuffle of the deck to have a random order
  deck.shuffle(deck.cards)

  // Going through all the players
  for (let a = 0; a < players.length; a++) {
    let satisfied = undefined
    // Going through all the possible cards the player can take (5)
    for (let b = 0; b < 4; b++) {
      // Checking if the deck only contains 1 card
      if (deck.cards < 2) {
        // adding the existing card to the throwedCards array
        deck.throwedCards.push(deck.cards)
        deck.shuffle(deck.throwedCards)
        players[a].insertCard(deck.getCard(deck.throwedCards))
      } else {
        players[a].insertCard(deck.getCard(deck.cards))
      }

      // Checking the value and how many cards the player have and do the following
      if (players[a].cards.length === 2) {
        let points = players[a].pointsOfCards(players[a].cards)
        
        if (points >= players[a].stopValue) {
          satisfied = true
        }
      } else if (players[a].cards.length > 2) {
        let points = players[a].pointsOfCards(players[a].cards)
        
        if (points >= players[a].stopValue) {
          satisfied = true
        }   
      } else if (players[a].totalValueOfCards === 21) {
        game.playerWins(player[a].name, player[a].cards, dealer.name)
        deck.throwedCards.push(players[a].cards)
        break
      } else if (players[a].totalValueOfCards > 21) {
        game.dealerWins(player[a].name, player[a].cards, dealer.name, dealer.cards)
        deck.throwedCards.push(players[a].cards)
        deck.throwedCards.push(dealer.cards)
        break
      }

      if (satisfied) {
        // the dealer is now going against the player
      }
    }
  }
  // end the game
  game.running = false
}
