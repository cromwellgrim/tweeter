/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* security function to prevent hijacking page from tweet form submission */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/* stock tweetData for initial tweets to be added to the page */
const tweetData = [
  {
    user: {
      name: "Gandalf",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@GreyWizard",
    },
    content: {
      text: "Even The Very Wise Cannot See All Ends.",
    },
    created_at: 1614034986366,
  },
  {
    user: {
      name: "Neil Gaiman",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@ng",
    },
    content: {
      text:
        "Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.",
    },
    created_at: 1614121386366,
  },
];

/* change the created_at element to day amount */
const day = function (milliseconds) {
  return Math.round(milliseconds / (60 * 60 * 24 * 2000) / 1000);
};

/* createTweetElement constructs an html article for the tweet based off info delivered from the db */
const createTweetElement = function (tweet) {
  let $tweet = $(`
  <article class="tweet-article">
    <header class="tweet-container-header">
      <div class="user-pic-name">
        <img class="user-pic" src="${tweet["user"]["avatars"]}" />
        <p>${tweet["user"]["name"]}</p>
      </div>
      <p class="user-handle">${tweet["user"]["handle"]}</p>
    </header>
    <p>${escape(tweet["content"]["text"])}</p>

    <hr>
    <footer class="tweet-container-footer">
    <p>${day(tweet["created_at"])} days ago</p>
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

/* toggle stretch goal 2: sends user back to top of screen */
$(document).ready(function () {
  $(".to-the-top").hide();
  $(window).on("scroll", function (event) {
    let showArrow = 200;
    if ($(this).scrollTop() > showArrow) {
      $(".to-the-top").fadeIn();
    } else {
      $(".to-the-top").fadeOut();
    }
  });
  $(".to-the-top").on("click", function (event) {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });
});

/* renderTweets loops through my tweet db and inputs the info into the createTweetElement */
const renderTweets = function (tweets) {
  for (let tweet of Object.values(tweets)) {
    $(".tweet-container").prepend(createTweetElement(tweet));
  }
};

/* This creates two sample tweets for the page to start with */
$(document).ready(function () {
  renderTweets(tweetData);
});

/* this toggles the new tweet form */
$(document).ready(function () {
  $(".nav-bar-btn").on("click", function (event) {
    $("#tweet-form").toggle("show");
    $("#tweet-text").focus();
  });
});

/* Submit even from the tweet form, checks for empty tweets or long tweets and shows errors.
   If no errors it clears my tweet form and sends the serialized data to the /tweets page */
$(function () {
  $("#tweet-form").on("submit", function (event) {
    event.preventDefault();
    let tweetLength = $("#tweet-text").val().length;
    let $tweetEmpty = $(`
      <p id="error"> Let us know your thoughts, type in a tweet</p>
    `);
    let $tweetLong = $(`
      <p id="error"> That's too many thoughts, cut your tweet back</p>
    `);

    if (!tweetLength) {
      $(".error-box").show();
      $(".error-box").empty();
      $(".error-box").append($tweetEmpty);

      return;
    }

    if (tweetLength > 140) {
      $(".error-box").show();
      $(".error-box").empty();
      $(".error-box").append($tweetLong);
      return;
    }

    if (140 > tweetLength >= 0) {
      $(".error-box").hide();
    }

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize(),
      success: function (data) {
        $(".counter").val(140);
        $("#tweet-text").val("");
      },
    });
  });
});

/* collects newly added info from the db (freshTweet) and renders it to the tweet container */
$(document).ready(function () {
  $("#tweet-form").on("submit", function (event) {
    event.preventDefault();
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).then((freshTweet) => {
      renderTweets(freshTweet);
    });
  });
});
