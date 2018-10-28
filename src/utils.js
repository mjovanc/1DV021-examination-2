/**
 * Utils module.
 *
 * @module src/utils
 * @author Marcus Cvjeticanin
 * @version 1.0
 */

'use strict'


/**
 * Throws Error/TypeError if not array or empty.
 * @param {Array<String>} array 
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 */
function checkArray (array) {
  if (!Array.isArray(array)) {
    throw new TypeError('The passed argument is not an array.')
  } else if (array.length < 1) {
    throw new Error('The passed array contains no elements.')
  }
}


/**
 * Throws TypeError if not a player object.
 * @param {Object} player
 * @throws {TypeError} The passed argument is not a player.
 */
function checkPlayer (player) {
  if (!(player.constructor.name == 'Player')) {
    throw new TypeError('The passed argument is not a player object.')
  }
}


module.exports.checkArray = checkArray
module.exports.checkPlayer = checkPlayer