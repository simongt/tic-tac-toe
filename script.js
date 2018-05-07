// $(document).ready(function () {
$(function() {
  let countTurns = 0;
  // keep a score
  let score = {
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
      wins: score.xWins // do not just init with 0
   },
    o: {
      boxes: [],
      combos: [],
      wins: score.oWins // do not just init with 0
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
  const $nameOfTheGame = $('<h1>');
  
  // insert game name as header
  $nameOfTheGame.text('tic-tac-toe');
  $nameOfTheGame.appendTo($body);

  // above the grid, display who's turn it is
  const $whosTurnIsIt = $('<p>');
  $whosTurnIsIt.text(`Player ${countTurns % 2 ? 'O' : 'X'}, it's your turn. Select a box.`);
  $whosTurnIsIt.appendTo($body);

  // create a grid that will act as a gameboard
  const $board = $('<div>');
  $board.addClass('board');
  $board.appendTo($body);

  // within this grid, there'll be 9 boxes (3x3)
  const numBoxes = 9;
  // let gameBoxes = [];
  playRound();

  function playRound() {
    // iterate through grid to make each box playable
    for (let i = 0; i < numBoxes; i++) {
      // $whosTurnIsIt.text(`Player ${countTurns % 2 ? 'O' : 'X'}, it's your turn.`);
      let $box = createBox();
      // gameBoxes.push($box);
      // each time a box is clicked, it represents an entire player turn
      let boxClick = $box.click(function () {
        // since a button is being clicked (player takes turn), toggle who's turn it is
        $whosTurnIsIt.text(`Player ${countTurns % 2 ? 'X' : 'O'}, it's your turn. Select a box.`);
        // enter x or o into box depending on player turn
        countTurns % 2 ? $box.text('o') : $box.text('x');
        // disable further clicks on box
        $box.off();
        // increment number of player turns
        countTurns++;
        let whosTurn = countTurns % 2 ? 'X' : 'O';
        console.log(`Player-${whosTurn} clicked box ${i}. There are ${numBoxes - countTurns} remaining empty spaces.`);
        if (whosTurn === 'X') {
          $box.addClass('x');
          player.x.boxes.push(i);
          player.x.boxes.sort();
        }
        else if (whosTurn === 'O') {
          $box.addClass('o');
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
            if (checkForWinningCombo(player.x.combos)) {
              score.xWins++; // update scoreboard
              updateScores();
              $whosTurnIsIt.text(`Player ${whosTurn} won in ${countTurns} moves. Prepare for the next round.`);
              console.log(`Player ${whosTurn} has won. Congrats! Prepare for the next round.`);
              // player-x has won, move on to the next round
              setTimeout(function () {
                clearBoard();
              }, 2000);
            }
          } else if (whosTurn === 'O') {
            player.o.combos = getCombosOf(player.o.boxes, 3);
            // console.log(player.o.boxes);
            // console.log(player.o.combos);
            if (checkForWinningCombo(player.o.combos)) {
              score.oWins++; // update scoreboard
              updateScores();
              $whosTurnIsIt.text(`Player ${whosTurn} won in ${countTurns} moves. Prepare for the next round.`);
              console.log(`Player ${whosTurn} has won. Congrats! Prepare for the next round.`);
              // player-o has won, move on to the next round
              setTimeout(function () {
                clearBoard();
              }, 2000);
            }
          // 9 turns is the max per game
          }
          if (countTurns === numBoxes
              && !checkForWinningCombo(player.x.combos)
              && !checkForWinningCombo(player.o.combos)) {
            console.log(`There are ${numBoxes - countTurns} empty spaces and now the board is full.`);
            score.ties++; // if no one won
            updateScores();
            $whosTurnIsIt.text(`We have a tie! Prepare for the next round.`)
            // no one has won, move on to the next round
            setTimeout(function () {
              clearBoard();
            }, 2000);
          }
        }
      });
    }
  }

  // button to clear board, start game over (keep scores)
  const $clear = $('<button>');
  $clear.addClass('clear');
  $clear.text('clear');
  $clear.click(function () {
    console.log(score);
    clearBoard();
  });
  $clear.appendTo($body);

  function clearBoard() {
    $board>$('.box').remove();
    player = {
      x: {
        boxes: [],
        combos: [],
        wins: score.xWins
      },

      o: {
        boxes: [],
        combos: [],
        wins: score.oWins
      }
    };
    countTurns = 0;
    $whosTurnIsIt.text(`Player ${countTurns % 2 ? 'O' : 'X'}, it's your turn.`);
    playRound();
  }

  // |  X  |  Ties  |  O  |
  // |-----|--------|-----|
  // |  #  |    #   |     |

  const $scoreBoardTitle = $('<p>');
  $scoreBoardTitle.text('SCORE BOARD');
  $scoreBoardTitle.appendTo($body);

  const $score = $('<div>');
  $score.addClass('score');
  $score.appendTo($body);
  const $xLabel = $('<h2>').text('X');
  $xLabel.appendTo($score);
  const $tLabel = $('<h2>').text('Ties');
  $tLabel.appendTo($score);
  const $oLabel = $('<h2>').text('O');
  $oLabel.appendTo($score);
  const $xScore = $('<div>').text(score.xWins).addClass('x').appendTo($score);
  const $tScore = $('<div>').text(score.ties).addClass('tie').appendTo($score);
  const $oScore = $('<div>').text(score.oWins).addClass('o').appendTo($score);
  function updateScores() {
    $xScore.text(score.xWins);
    $tScore.text(score.ties);
    $oScore.text(score.oWins);
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
          animateWinningCombo(combo);
          return true;
        } else {
          // console.log(`${combo} is not a winning combo.`);
        }
      }
    }
    return false;
  }

  function animateWinningCombo(combo) {
    let comboBoxes = document.querySelectorAll('.board>.box'); // how to do in jQuery?
    console.log(comboBoxes);
    /* toggle color */
    for (let i = 0; i < combo.length; i++) {
      console.log(`[Toggle color for ${combo[i]} to cyan]`);
      console.log(comboBoxes[combo[i]]);
      // comboBoxes[i].addClass('combo');
      comboBoxes[combo[i]].setAttribute('class', 'box combo'); // how to do in jQuery?
    }
  }

  // disable clicking on all the boxes
  // funtion pauseTurns() {
  //   console.log(gameBoxes);
  //   // for (let i=0; i<gameBoxes.length; i++) {
  //   //   $gameBoxes[i].off();
  //   // }
  // }

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
