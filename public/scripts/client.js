/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// $("#tweet-form").text(textFromUser);
// I need my security to be achieved!


const tweetData = [
  {
    "user": {
      "name": "Gandalf",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@GreyWizard"
    },
    "content": {
      "text": "Even The Very Wise Cannot See All Ends."
    },
    "created_at": 1614034986366
  },
  {
    "user": {
      "name": "Neil Gaiman",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@ng"
    },
    "content": {
      "text": "Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten."
    },
    "created_at": 1614121386366
  }
];

// change the created_at element to real time

/* createTweetElement constructs an html article for the tweet based off info delivered from the db */
const createTweetElement = function(tweet) {
  let $tweet = $(`
  <article class="tweet-article">
    <header class="tweet-container-header">
      <div class="user-pic-name">
        <img class="user-pic" src="${tweet["user"]["avatars"]}" />
        <p>${tweet["user"]["name"]}</p>
      </div>
      <p class="user-handle">${tweet["user"]["handle"]}</p>
    </header>
    <p>${tweet["content"]["text"]}</p>
    <hr>
    <footer class="tweet-container-footer">
    <p>${tweet["created_at"]} day ago</p>
    <div class="icons">
      <img src="/images/s-bell.png">
      <img src="/images/s-retweet.png">
      <img src="/images/s-star.png">
    </div>
    </footer>  
  </article>
  `);
  return $tweet;
};

// toggle stretch goal = $('#tweet-form').hide();

/* renderTweets loops through my tweet db and inputs the info into the createTweetElement */
const renderTweets = function(tweets) {
  for (let tweet of Object.values(tweets)) {
  $('.tweet-container').prepend(createTweetElement(tweet));
  }
};

/* This creates two sample tweets for the page to start with */
$(document).ready(function() {
  renderTweets(tweetData);
});


/* Submit even from the tweet form, checks for empty tweets or long tweets and shows errors.
   If no errors it clears my tweet form and sends the serialized data to the /tweets page */
$(function() {
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    let tweetText = $('#tweet-text').val().length;
    let $tweetEmpty = $(`
      <p id="error"> Let us know your thoughts, type in a tweet</p>
    `);
    let $tweetLong = $(`
      <p id="error"> That's too many thoughts, cut your tweet back</p>
    `);
    
    if (!tweetText) {
      $('.error-box').show();
      $('.error-box').empty();
      $('.error-box').append($tweetEmpty);

      return;
    }

    if(tweetText > 140) {
      $('.error-box').show();
      $('.error-box').empty();
      $('.error-box').append($tweetLong);
      return;
    }

    if(140 > tweetText >= 0) {
      $('.error-box').hide();
      $('#tweet-text').val('');
    }

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize()
    })
  });
});

/* collects newly added info from the db (freshTweet) and renders it to the tweet container */
$(document).ready(function() {
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      url: '/tweets',
      method: "GET",
    })
    .then((freshTweet) => {
      renderTweets(freshTweet);
    });
  });
});

