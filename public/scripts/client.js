/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//function to build html for tweets dynamically
const $createTweetElement = (tweetObj) => {
  console.log('hi');
  const $tweet = $("<article class='tweet'>");
  //tweet header
  const $header = $("<div class='th-header'>");
  //header children
  const $headerD1 = $("<div class='name-left'>");
  const $avatar = $('<img>').attr('src', tweetObj.user.avatars);
  const $name = $('<h3>').text(tweetObj.user.name);
  $headerD1.append($avatar);
  $headerD1.append($name);
  const $headerD2 = $("<div id='userID'>");
  const $handle = $('<p>').text(tweetObj.user.handle);
  $headerD2.append($handle);
  //append the contents of header
  $header.append($headerD1);
  $header.append($headerD2);
  //tweet content
  const $contentContainer = $("<div class='display-tweet'>");
  const $contentText = $('<p>').text(tweetObj.content.text);
  //append tweet text to container
  $contentContainer.append($contentText);
  //tweet footer
  const $footer = $('<footer>');
  //tweet footer children
  
  
  const $footerD2 = $("<div class='icons'>");
  const $flag = $("<i class='far fa-flag' id='flag'>");
  const $retweet = $("<i class='fas fa-retweet' id='retweet'>");
  const $heart = $("<i class='far fa-heart' id='heart'>");
  $footerD2.append($flag);
  $footerD2.append($retweet);
  $footerD2.append($heart);
  //append footer children to footer
  $footer.append($footerD2);
  //add all of the children to the tweet div
  $tweet.append($header);
  $tweet.append($contentContainer);
  $tweet.append($footer);
  return $tweet;
};

//loops through all tweets
const $renderTweets = function (tweets) {
  const $container = $(".tweet-history");
  $container.empty();
  tweets.forEach((tweet) => {
    const tweetNode = $createTweetElement(tweet);
    $container.prepend(tweetNode);
  });
};

// Fake data taken from initial-tweets.json
const $data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$renderTweets($data);


// Test / driver code (temporary)
// $(".tweet-history").append($createTweetElement($tweetData));// to add it to the page so we can make sure it's got all the right elements, classes, etc.

