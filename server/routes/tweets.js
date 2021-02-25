"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });
  
  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });
  /* receives tweet data and saves it to the db */
  tweetsRoutes.post("/tweets", function(req, res) {
    let freshTweet = req.body.text;
    DataHelpers.saveTweet((freshTweet, err));
    res.redirect('/');
  });
  /* sends db info back to the main page to post in a tweet container */
  tweetsRoutes.get("/tweets", function(req, res) {
    DataHelpers.getTweets(db);
    res.render("/");
  });

  return tweetsRoutes;

}
