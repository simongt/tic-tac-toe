# Tic-Tac-Toe

This is a recreation of the classic game **Tic-Tac-Toe**. I built it with JavaScript (jQuery), while using CSS Grid to create the gameboard layout.

<p align="center">
  <img src="https://simongt.net/img/bits/tic-tac-toe.gif" alt="Tic-Tac-Toe" />
</p>

## Game Components
* A user is able to click on different squares to make a move.
* Every click alternates turns between Player 1 or Player 2.
* Clicking the reset button will clear the contents of the board.

## Implementation

1. While `index.html` is the starting point of this project, the entire game board is wired up by manipulating DOM elements in `script.js`.
2. The game board includes a 3x3 grid (using CSS Grid) and a reset button.
3. If there is no winner, the round ends in a draw, yet the game keeps going.
4. The game state is being tracked using multi-dimensional arrays (e.g. what marks are on the board in what locations, as well as who's turn it is).
5. A message is displayed to indicate which turn is about to be played.
6. After a move has been played, game pauses to alert the winner (i.e. one player ends up winning with three in a row) and then continues to the next round.
   * A pre-determined set of winning combinations is constantly checked to see if any of the current combinations on the board contents match per move.
7. *Backlog*: Implement an AI opponent (using the minimax algorithm).

#### Note

This project was implemented using jQuery, however I intend to refactor it using only vanilla JavaScript (and move the jQuery version into a separate branch).
