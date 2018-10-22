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
    let start = true
} else {
    let start = false
}

while (start) {
    deck.shuffle(deck.cards)
    if (deck.cards < 2) {
        deck.shuffle(deck.throwedCards) // kör shuffle på de kort som kastats i kasthögen
    } else {
        // här körs spelet på som vanligt tills condition ovan är sant
        for (let a = 0; a < players.length; a++) {
            for (let b = 0; b < 4; b++) {
                if (players[i].cards.length == 2) {
                    // om korten är lika med två exakt så ska det evalueras
                    // om spelaren ska ta mer kort
                } // Kör en else if () här och kontrollera om spelarens värde på korten är mer än 21
                players[i].insertCard(deck.getCard())
            }   
        }
        start = false // avslutar spelet då alla spelare spelat
    }  
}

