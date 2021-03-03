/* 
  counts the number of characters typed in the tweet text box
  and decreases the counter by those characters (starting at
  140. Adds a class when the count is negative to change the
  font colour to red.
*/
$(document).ready(function() {
  $("#tweet-text").on("keyup", function(event) {
    
    const $tweetTextArea = $(this);
    const $tweetForm = $tweetTextArea.parent();
    const $counter = $tweetForm.find(".counter");
    const numOfChars = $tweetTextArea.val().length;
    const charsLeft = 140 - numOfChars;
    
    $counter.text(charsLeft);
    if (charsLeft < 0) {
      $counter.addClass("counter-negative");
    } else {
      $counter.removeClass("counter-negative");
    }

  });
});
