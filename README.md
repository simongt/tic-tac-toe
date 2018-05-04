# Tic Tac Toe Lab

**Objective:** Build a tic tac toe game in HTML and JavaScript.

## Required Game components
* A user should be able to click on different squares to make a move.
* When a square is clicked, there should be visual feedback.
* Every click will alternate between being for Player 1 or Player 2. The visual feedback should indicate whose turn it is.
* A cell should not be able to be replayed once marked.
* Add a reset button that will clear the contents of the board.

#### Note
You may complete this assignment using jQuery or vanilla JavaScript. Please pick **one approach** for this project.

## How to get started
1. Construct a game board in your `index.html` to be your starting point on this project. Add your necessary HTML tags, including `script` and `link` tags to link to your separate JavaScript and CSS files respectively. The game board page should include the 3x3 grid (use Flexbox or perhaps research CSS grid!), and at minimum a reset button. Using `id` and `class` on clickable elements will help you wire this up in JavaScript afterwards.
2. JavaScript portion will be next:
  * Until there is a winner, continue the game.
  * You will need to keep track of the game state - what marks are on the board in what locations, as well as who's turn it is. There are many ways to do this. One way that seems to provide for a clean solution is through the use of a [two dimensional array](http://www.javascripttutorial.net/javascript-multidimensional-array/) representing the game board state. But keep in mind, this is not the only way to solve this problem! It just might be a good thing to explore if you find yourself getting stuck.

## Bonus
* Display a message to indicate which turn is about to be played.
* After the necessary moves have been played, stop game and alert the winner if one player ends up winning with three in a row.
* Hint: Determine a set of winning combinations. Check those combinations on the board contents after every move.

## Ultra Bonus
* We once had a student implement an Artificial Intelligence (AI) opponent. If you really need a challenge, write some code that will play a game of Tic Tac Toe against you. (Hint: look into the minimax algorithm).

## Starter code

There is no starter code provided for this lab.

## Deliverable

Please find some screenshots of what you'll be creating.  Feel free to get creative with how you style your interface.

![Screen-shot](assets/kz2L9f9.png)
![Screen-shot](assets/d8lFshD.png)
![Screen-shot](assets/Jw6hhcA.png)

## Submission

This lab is due **Sunday, May 6th by 11:00 PM**.

### Additional Resources

- [CSS-Tricks "What Is The DOM"](https://css-tricks.com/dom/)
- [More on events with Eloquent JavaScript](http://eloquentjavascript.net/14_event.html)
