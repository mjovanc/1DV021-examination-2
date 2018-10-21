'use strict'

const Deck = require('./src/deck')

let deck = new Deck()

console.log(deck.cards)

deck.shuffle()

console.log(deck.cards)
