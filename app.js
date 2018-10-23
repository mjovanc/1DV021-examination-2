'use strict'

const Game = require('./src/game')
const Deck = require('./src/deck')
const Player = require('./src/player')

let game = new Game('21', 30)
let deck = new Deck()
let dealer = new Player('Dealer', 18)

let players = []
for (let i = 0; i < game.players; i++) {
  //let randomNumber = Math.floor(Math.random() * 11) + 8
  players[i] = new Player('Player #' + (i + 1), 20)
}

while (game.isRunning) {
  deck.shuffle(deck.cards)

  for (let a = 0; a < players.length; a++) {
    let satisfied = undefined
    for (let b = 0; b < 4; b++) {

      if (deck.cards.length < 2) {
        deck.combineCards()
        deck.shuffle(deck.cards)
        players[a].insertCard(deck.getCard(deck.cards))
      } else {
        players[a].insertCard(deck.getCard(deck.cards))
      }


      if (players[a].totalValueOfHand() > 21) {
        console.log('Dealer wins!')
      } else if (players[a].totalValueOfHand() < 21) {
        console.log('Less than 21!')
        
        if (players[a].hand.length > 2) {
          // if the totalValueOfHand is more or equal to stopValue
          console.log('More than 2 cards in hand.')
        } else if (players[a].hand.length === 2) {
          // if the totalValueOfHand is more or equal to stopValue
          console.log('Equal to two cards in hand.')
        }

      } else if (players[a].totalValueOfHand() === 21) {
        console.log('Player wins!')
      }

    }
    deck.throwUsedCards(players[a].hand)
  }
  game.isRunning = false
}
