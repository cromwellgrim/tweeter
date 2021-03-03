/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* security function to prevent hijacking page from tweet form submission */
const escape = function (str) {
	const div = document.createElement("div");
	div.appendChild(document.createTextNode(str));
	return div.innerHTML;
};

/* change the created_at element to day amount */
const timeSinceTweet = function (now, before) {
	const timePassed = now - before;
	const minute = 60 * 1000;
	const hour = minute * 60;
	const day = hour * 60;

	if (timePassed < minute) {
		return Math.round(timePassed / 1000) + " seconds ago";
	} else if (timePassed < hour) {
		return Math.round(timePassed / minute) + " minutes ago";
	} else if (timePassed < day) {
		return Math.round(timePassed / hour) + " hours ago";
	} else if (timePassed > day) {
		return "This tweet happened a long time ago";
	}
};

/* createTweetElement constructs an html article for the tweet based off info delivered from the db */
const createTweetElement = function (tweet) {
	const $tweet = $(`
  <article class="tweet-article">
    <header class="tweet-container-header">
      <div class="user-pic-name">
        <img class="user-pic" src="${tweet.user.avatars}" />
        <p>${tweet.user.name}</p>
      </div>
      <p class="user-handle">${tweet.user.handle}</p>
    </header>
    <p>${escape(tweet.content.text)}</p>

    <hr>
    <footer class="tweet-container-footer">
    <p>${timeSinceTweet(Date.now(), tweet.created_at)}</p>
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
		const showArrow = 200;
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

/* stretch: this toggles the new tweet form */
$(document).ready(function () {
	$(".nav-bar-btn").on("click", function (event) {
		$(".error-box").toggle("show");
		$("#tweet-form").toggle("show");
		$("#tweet-text").focus();
	});
});

/* validation function */
const tweetValid = function (tweetText) {
	const tweetLength = tweetText.length;

	const $tweetEmpty = $(`
    <p id="error"> Let us know your thoughts, type in a tweet</p>
  `);

	const $tweetLong = $(`
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
		return true;
	}
};

/* Submit event from the tweet form, checks for empty tweets or long tweets and shows errors.
   If no errors it clears my tweet form and sends the serialized data to the /tweets page */
$(document).ready(function () {
	$("#tweet-form").on("submit", function (event) {
		event.preventDefault();

		if (tweetValid($("#tweet-text").val())) {
			$.ajax({
				url: "/tweets",
				method: "POST",
				data: $("#tweet-text").serialize(),
			}).then(() => {
				$(".counter").val(140);
				$("#tweet-text").val("");
				$("article").remove();
				getTweets();
			});
		}
	});
});

/* collects newly added info from the db (freshTweet) and renders it to the tweet container */
const getTweets = function () {
	$.ajax({
		url: "/tweets",
		method: "GET",
		dataType: "JSON",
		success: (freshTweet) => {
			renderTweets(freshTweet);
		},
	});
};
