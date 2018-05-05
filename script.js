// $(document).ready(function () {
$(function() {
  let countTurns = 0;
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
    let boxClick = $box.click(function() {
      countTurns++;
      console.log(`Box ${i} clicked.`);
      if(countTurns % 2) {
        $box.text('x');
      } else {
        $box.text('o');
      }
      $box.off();
    });
    $box.appendTo($board);
  }
  function createBox() {
    let $newBox = $('<div>');
    $newBox.addClass('box');
    return $newBox;
  }
});
