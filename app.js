'use strict'

const Deck = require('./src/deck')
const Player = require('./src/player')

const NumberOfPlayers = 3

let players = []

for (let i = 0; i < NumberOfPlayers; i++) {
    let randomNumber = Math.floor(Math.random() * 11) + 8;
    players[i] = new Player('Player #' + (i+1), randomNumber)
}

let deck = new Deck()