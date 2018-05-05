// $(document).ready(function () {
$(function() {
  let countTurns = 0;
  // keep a score
  let scoreBoard = {
    xWins: 0, // player 1
    oWins: 0, // player 2
    ties: 0
  };
  // 2 players: player.x and player.o
  // each player will have their picks pushed into an array (boxes)
  // each player will have their wins tracked from 
  let player = {
    x: {
      boxes: [],
      combos: [],
      wins: scoreBoard.xWins // can just init with 0
   },

    o: {
      boxes: [],
      combos: [],
      wins: scoreBoard.oWins // can just init with 0
    }   
  };
  let winningCombos = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
  ];
  // grab the html body
  const $body = $('body');
  // create a grid that will act as a gameboard
  const $board = $('<div>');
  $board.addClass('board');
  $board.appendTo($body);
  // within this grid, there'll be 9 boxes (3x3)
  const numBoxes = 9;
  for (let i = 0; i < numBoxes; i++) {
    let $box = createBox();
    // each time a box is clicked, it represents an entire player turn
    let boxClick = $box.click(function() {
      // enter x or o into box depending on player turn
      countTurns % 2 ? $box.text('o') : $box.text('x');
      // disable further clicks on box
      $box.off();
      // increment number of player turns
      countTurns++;
      let whosTurn = countTurns % 2 ? 'X' : 'O';
      console.log(`Player-${whosTurn} clicked box ${i}. There are ${numBoxes - countTurns} remaining empty spaces.`);
      if(whosTurn === 'X') {
        player.x.boxes.push(i);
        player.x.boxes.sort();
      }
      else if(whosTurn === 'O') {
        player.o.boxes.push(i);
        player.o.boxes.sort();
      }
      // the minimum number of turns to check for a winner is 5
      if (countTurns >= 5) {
        // check for winner
        console.log(`[Check if Player-${whosTurn} is a winner]`);
        // given each players' set, find all 3-number combinations
        if (whosTurn === 'X') {
          player.x.combos = getCombosOf(player.x.boxes, 3);
          console.log(player.x.boxes);
          console.log(player.x.combos);
          // loop through each combo and see if it matches a winning combo
          if(checkForWinningCombo(player.x.combos)) {
            // if player-x has won, then allow for no more turns
            
          }
        } else if (whosTurn === 'O') {
          player.o.combos = getCombosOf(player.o.boxes, 3);
          console.log(player.o.boxes);
          console.log(player.o.combos);
          if (checkForWinningCombo(player.o.combos)) {
            // if player-o has won, then allow for no more turns

          }
        }
      }
      // 9 turns is the max per game
      if (countTurns >= numBoxes) {
        console.log(`There are ${numBoxes - countTurns} empty spaces and now the board is full. Moment of truth!`);
      }
      // Update scoreboard
      // if no one won, scoreBoard.ties++;
      // if player 1 won, scoreBoard.xWins++;
      // if player 2 won, scoreBoard.oWins++;
    });
  }
  function createBox() {
    let $newBox = $('<div>');
    $newBox.addClass('box');
    $newBox.appendTo($board);
    return $newBox;
  }

  function checkForWinningCombo(combos) {
    for (const combo of combos) { // player combos
      for (const winningCombo of winningCombos) { // winning combos
        if ((combo[0] === winningCombo[0]) &&
          (combo[1] === winningCombo[1]) &&
          (combo[2] === winningCombo[2])) {
          console.log(`${combo} is a winning combo!!`);
          return true;
        } else {
          console.log(`${combo} is not a winning combo.`);
        }
        // if (winningCombos.includes(combo)) {
        //   console.log(`Winning combo found! ${combo}`);
        //   return true;
        // } else {
        //   console.log(`${combo} is not a combo.`);
        // }
      }
    }
    return false;
  }
});
