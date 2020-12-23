/**
 * @description Determines if there is a winner to the game.
 * @returns {boolean} ```True``` when game should end, ```false``` otherwise.
 */
export default function gameEnds(table) {
  // if there are no more players.
  if(table._cards.length === 5) {
    return true;
  }
  else { 
    return false;
  }
}//End of gameEnds