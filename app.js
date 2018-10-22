'use strict'

const Deck = require('./src/deck')
const Player = require('./src/player')

const numberOfPlayers = 3

let players = []
for (let i = 0; i < numberOfPlayers; i++) {
    let randomNumber = Math.floor(Math.random() * 11) + 8;
    players[i] = new Player('Player #' + (i+1), randomNumber)
}

let deck = new Deck()
let dealer = Player('Dealer', 18)

if (numberOfPlayers > 0) {
    let run = true
} else {
    let run = false
}

while (run) {
    deck.shuffle(deck.cards)
    if (deck.cards < 2) {
        deck.shuffle(deck.throwedCards) // kör shuffle på de kort som kastats i kasthögen
    } else {
        for (let a = 0; a < players.length; a++) {
            for (let b = 0; b < 4; b++) {
                players[i].insertCard(deck.getCard())
                if (players[a].cards.length == 2) {
                    // code
                } else if (players[a].totalValueOfCards === 21) {
                    console.log(`${players[a].name}: ${players[a].cards.toString()}\n${dealer.name}: -\nPlayer wins!`)
                    break
                }
            }   
        }
        run = false // avslutar spelet då alla spelare spelat
    }  
}

