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
  // list of winning combos
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
          // console.log(player.x.boxes);
          // console.log(player.x.combos);
          // loop through each combo and see if it matches a winning combo
          if(checkForWinningCombo(player.x.combos)) {
            // player-x has won, allow for no more turns
            scoreBoard.xWins++; // update scoreboard
          }
        } else if (whosTurn === 'O') {
          player.o.combos = getCombosOf(player.o.boxes, 3);
          // console.log(player.o.boxes);
          // console.log(player.o.combos);
          if (checkForWinningCombo(player.o.combos)) {
            // if player-o has won, then allow for no more turns
            scoreBoard.oWins++; // update scoreboard
          }
        }
      }
      // 9 turns is the max per game
      if (countTurns >= numBoxes) {
        console.log(`There are ${numBoxes - countTurns} empty spaces and now the board is full. Moment of truth!`);
        scoreBoard.ties++; // if no one won
      }
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

  // Akseli Palén's solution for calculating combinations of elements in Array
  // Github: https://gist.github.com/axelpale/3118596
  //
  // Algorithm description:
  // To get k-combinations of a set, we want to join each element
  // with all (k-1)-combinations of the other elements. The set of
  // these k-sized sets would be the desired result. However, as we
  // represent sets with lists, we need to take duplicates into
  // account. To avoid producing duplicates and also unnecessary
  // computing, we use the following approach: each element i
  // divides the list into three: the preceding elements, the
  // current element i, and the subsequent elements. For the first
  // element, the list of preceding elements is empty. For element i,
  // we compute the (k-1)-computations of the subsequent elements,
  // join each with the element i, and store the joined to the set of
  // computed k-combinations. We do not need to take the preceding
  // elements into account, because they have already been the i:th
  // element so they are already computed and stored. When the length
  // of the subsequent list drops below (k-1), we cannot find any
  // (k-1)-combs, hence the upper limit for the iteration.
  function getCombosOf(set, k) {
    var i, j, combos, head, tailCombos;

    // There is no way to take e.g. sets of 5 elements from
    // a set of 4.
    if (k > set.length || k <= 0) {
      return [];
    }

    // K-sized set has only one K-sized subset.
    if (k == set.length) {
      return [set];
    }

    // There is N 1-sized subsets in a N-sized set.
    if (k == 1) {
      combos = [];
      for (i = 0; i < set.length; i++) {
        combos.push([set[i]]);
      }
      return combos;
    }

    // Assert {1 < k < set.length}
    combos = [];
    for (i = 0; i < set.length - k + 1; i++) {
      // head is a list that includes only our current element.
      head = set.slice(i, i + 1);
      // We take smaller combinations from the subsequent elements
      tailCombos = getCombosOf(set.slice(i + 1), k - 1);
      // For each (k-1)-combination we join it with the current
      // and store it to the set of k-combinations.
      for (j = 0; j < tailCombos.length; j++) {
        combos.push(head.concat(tailCombos[j]));
      }
    }
    return combos;
  }
});
