/**
 * Starting point of the application
 * @author Marcus Cvjeticanin (mc222sn)
 * @version 1.0
 */

'use strict'

const Game = require('./src/Game')

const amountOfPlayers = 30

let game = new Game(amountOfPlayers)

game.start()
