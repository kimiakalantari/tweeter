/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//function to build html for tweets dynamically
const $createTweetElement = (tweetObj) => {
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
  
  const $timeDelta = timeago().format(tweetObj.created_at);
  console.log($timeDelta);
  const $timeStamp = $('<p>').text($timeDelta);
  const $footerD2 = $("<div class='icons'>");
  const $flag = $("<i class='far fa-flag' id='flag'>");
  const $retweet = $("<i class='fas fa-retweet' id='retweet'>");
  const $heart = $("<i class='far fa-heart' id='heart'>");
  $footerD2.append($flag);
  $footerD2.append($retweet);
  $footerD2.append($heart);
  //append footer children to footer
  $footer.append($footerD2);
  $footer.append($timeStamp);
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

const $loadTweets = () => {
  $.ajax({
    url:"/tweets", 
    method:'GET', 
  })
  .done((datatweets) => {
    $renderTweets(datatweets); 
  })
}

//function to add custom error message
const appendError = (message) => {
  $('.new-tweet').prepend(
    $("<span class='error'>")
      .text('⚠️ ' + message + ' ⚠️')
      .slideDown()
      .delay(3500)
      .hide(500)
  );
};

//removes errors to keep multiple errors from popping up with repeated error inducing clicks
const removeError = () => {
  $('.error').remove();
};

$(document).ready(function() {

$loadTweets();

$('#new-tweet-form').on('submit', function (event) {
  event.preventDefault();

  const $tweetText = $(this).children('#tweet-text');

  const formContent = $(this).serialize();

  //handle errors
  removeError();
  if ($('#tweet-text').val() === '' || null) {
     appendError('You cannot post a blank tweet');
  } else if ($('#tweet-text').val().length > 140) {
     appendError('Your tweet is too long!');
  } else {

  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: formContent
  })
  .done(() => $loadTweets())

  $("#tweet-text").val("");
  let count = $(this).find(".counter").val("140");
}

});




// $renderTweets($data);


// Test / driver code (temporary)
// $(".tweet-history").append($createTweetElement($tweetData));// to add it to the page so we can make sure it's got all the right elements, classes, etc.

});