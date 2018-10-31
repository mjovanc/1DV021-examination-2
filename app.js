/**
 * Starting point of the application
 * @author Marcus Cvjeticanin (mc222sn)
 * @version 1.1
 */

'use strict'

const Game = require('./src/Game')
const numberOfPlayers = 30

let game = new Game(numberOfPlayers)

game.start()
