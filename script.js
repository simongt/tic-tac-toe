// $(document).ready(function () {
$(function() {
  // grab the html body
  const $body = $('body');
  // create a table that will act as a gameboard
  const $board = $('<div>');
  $board.addClass('board');
  $board.appendTo($body);
  // within this table, there'll be 9 boxes (3x3)
  const numBoxes = 9;
  for (let i = 0; i < numBoxes; i++) {
    let $box = createBox();
    let boxClick = $box.click(function() {
      console.log(`Box ${i} clicked.`);
    });
    $box.appendTo($board);
  }
  function createBox() {
    let $newBox = $('<div>');
    $newBox.addClass('box');
    return $newBox;
  }
});
