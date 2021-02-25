/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1614034986366
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1614121386366
  }
];

const createTweetElement = function() {
  let $tweet = $(`
  <article>
    <header>
      <div class="user-pic-name">
      <img class="user-pic" src=${tweetData.user["avatars"]} />
      <p>${tweetData.user["name"]}</p>
      <div>
      <p class="user-handle">${tweetData.user["handle"]}</p>
    </header>
    <p>${tweetData.content["text"]}</p>
    <footer>
    <p>${tweetData.created_at} day ago</p>
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
  for (let tweet of tweets) {
    $('.tweet-container').append(createTweetElement(tweet);
  }
};


$(document).ready(function () {
  renderTweets(tweetData)
});