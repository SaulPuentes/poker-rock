import Movement from '@models/Movement'

/**
 * @description Handles the movement made from the current player.
 * @param {Movement} movement The movement made by the player.
 * @param {number} bet The bet, if any to Raise or Call.
 * @returns {undefined} Nothing.
*/
export default function handleTurnEnd(table, lastMovement) {
    const { _currentTurnIndex, _players } = table
    const { bet, movement, player } = lastMovement
    table._records.push({
        userName: player,
        movement: movement,
        amount: bet
    });

    // increase bet, if exists
    if(bet) {
      table._bet += bet;
    }
    
    // check if folded
    if(movement === Movement.FOLD.value) {
      const index = _players.findIndex(item => item._user === player);
      console.log('index:', index)
      console.log('table:', table._players)
      table._players[index]._isFolded = true;
    }

    let validIndex;
    let nextIndex = _currentTurnIndex;
    while(!validIndex) {
      console.log('START');
      console.log('nextIndex: ', nextIndex);
      // update turn index.
      if( nextIndex >= _players.length - 1 )
        nextIndex = table._players.findIndex(item => !item._isFolded)
      else
        nextIndex++
      
      // validate index is not folded
      if(!table._players[nextIndex]._isFolded)
        validIndex = true
      else
        nextIndex++
      console.log('FINISH');
      console.log('nextIndex: ', nextIndex);
    }
    table._currentTurnIndex = nextIndex
    console.log('table._currentTurnIndex: ', table._currentTurnIndex);
    

    if(shouldAddCard(table)) {
      console.log('ANOTHER CARD');
      const card = table._deck._cards.pop();
      table._cards.push(card);
    }
    return table;
}

/**
 * @description Determines if a card should be added at this point.
 * @returns {boolean} ```True``` when a card should be added, ```false``` otherwise.
 */
function shouldAddCard(table) {
  let sliceIndex = -1 * (table._players.length - 1);
  let lastRecords = table._records.slice(sliceIndex);
  
  // if everybody folded
  //if(lastRecords.map(r => r.movement.value === Movement.FOLD.value).length === lastRecords.length)
  let f1 = lastRecords.map(r => r.movement == Movement.FOLD.value);
  let f = f1.every(u => u === true);

  let r1 = lastRecords.map(r => r.movement == Movement.RAISE.value);
  let r = r1.every(v => v === true);
  
  //If everybody falls, then the table gets another card
  if(f == true) {
    return true;
  }
  // if everybody called
  //if(lastRecords.map(r => r.movement.value === Movement.RAISE.value).length === lastRecords.length)
  else if(r == true ) {
    console.log("Raise");

    return true;
  }
  // not if anyone has raised
  else if(lastRecords.find(r => r.movement.value == Movement.RAISE.value) != undefined) {
    console.log("Raise Not")
    return false;
  }
  else {
    console.log("??")
    return true;
  }
}
