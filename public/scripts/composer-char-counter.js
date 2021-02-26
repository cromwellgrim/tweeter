$(document).ready(function() {
  $("#tweet-text").on("keyup", function(event) {
    let $tweetTextArea = $(this);
    let $tweetForm = $tweetTextArea.parent();
    let $counter = $tweetForm.find(".counter");
    let numOfChars = $tweetTextArea.val().length;
    let charsLeft = 140 - numOfChars;
    $counter.text(charsLeft);
    if (charsLeft < 0) {
      $counter.addClass("counter-negative");
    } else {
      $counter.removeClass("counter-negative");
    }
  });
});
