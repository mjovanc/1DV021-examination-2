'use strict'

const Deck = require('./src/deck')
const Player = require('./src/player')

const numberOfPlayers = 3

let players = []
for (let i = 0; i < numberOfPlayers; i++) {
  let randomNumber = Math.floor(Math.random() * 11) + 8
  players[i] = new Player('Player #' + (i + 1), randomNumber)
}

let deck = new Deck()
let dealer = Player('Dealer', 18)

if (numberOfPlayers > 0) {
  let run = true
} else {
  let run = false
}

while (run) {
  // Starting with a shuffle of the deck to have a random order
  deck.shuffle(deck.cards)

  // Going through all the players
  for (let a = 0; a < players.length; a++) {
    let statisfied = undefined
    // Going through all the possible cards the player can take (5)
    for (let b = 0; b < 4; b++) {
      // Checking if the deck only contains 1 card
      if (deck.cards < 2) {
        // adding the existing card to the throwedCards array
        deck.throwedCards.push(deck.cards)
        deck.shuffle(deck.throwedCards)
        players[i].insertCard(deck.getCard(deck.throwedCards))
      } else {
        players[i].insertCard(deck.getCard(deck.cards))
      }

      // Checking the value and how many cards the player have and do the following
      if (players[a].cards.length === 2) {
        if (statisfied) {
          deck.throwedCards.push(players[a].cards)
          break
      } else if (players[a].cards.length > 2) {
        if (statisfied) {
          deck.throwedCards.push(players[a].cards)
          break
        }
      } else if (players[a].totalValueOfCards === 21) {
        console.log(`${players[a].name}: ${players[a].cards.toString()}\n${dealer.name}: -\nPlayer wins!`)
        // Pushing the used cards to the throwedCards array because the player wins
        deck.throwedCards.push(players[a].cards)
        break
        }
      } 
    }
  // end the loop
  run = false
  }
}
