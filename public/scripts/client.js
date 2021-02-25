/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// $("#tweet-form").text(textFromUser);


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

const renderTweets = function(tweets) {
  for (let tweet of Object.values(tweets)) {
  $('.tweet-container').prepend(createTweetElement(tweet));
  }
};

$(document).ready(function() {
  renderTweets(tweetData);
});

$(function() {
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    let tweetText = $('#tweet-text').val().length;
    

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize()
    })
  });
});


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

