/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
  // hide error, since there should be no error on initial load
  $(".error").hide()

  $(window).on('scroll', function (event) { // if window scroll, log where, if past write tweet area, scroll btn appear(on moblie only)
    let $scroll = $(window).scrollTop();
    var $width = $(window).width();
    if ($scroll > 450 && $width < 768) {
      $('.btn-scroll').css("display","flex")
    } else {
      $('.btn-scroll').css("display","none")
    }
  });

  $(".btn-scroll").on('click', function () { //take user to write tweet when click on btn
    $('html').animate({scrollTop : 0}, 300);
    $("#tweet-text").focus();
  })

  $(".nav-btn").on('click', function () { //same as above, but different btn
    $('html').animate({scrollTop : 0}, 300);
    $("#tweet-text").focus();
  })

  $(".tweet-submit").on('submit', function (event) { // when user write new tweet
    event.preventDefault(); //stop page from redirect
    $(".error").hide() //if there is error, hide it
    let $tweet = $(this).children("#tweet-text").val().length;
    if (!$tweet) {//if empty, shown below error
      $(this).children(".error").text("⚠️  Error: Tweet is empty!  ⚠️")
      $(".error").slideDown()
    } else if ($tweet > 140){//if past limit, shown...ry
      $(this).children(".error").text("⚠️  Error: Excess 140 characters limit!  ⚠️")
      $(".error").slideDown()
    } else {//if ok, send to server
    $.ajax("/tweets", {method: 'POST', data: $(".tweet-submit").serialize()})//use ajax to handle request to the server
    .then(function () {
      $("#tweet-text").siblings().children('.counter').text(140)//reset counter
      $("#tweet-text").val(""); //clear write tweet area
      loadtweets(); //call to load tweet
      })
    }
  });

  const loadtweets = function() {
    $.ajax("/tweets", {method: 'GET'}) //get tweet from server with ajax to prevent reloading
    .then(function (something) {
      renderTweets(something);}) //call rendering from the data of tweet from server
  }

  const renderTweets = function(tweets) {
    $("#tweet-container").empty(); //clear area
    tweets.forEach(info => { //for each tweet, then
      $("#tweet-container").prepend(createTweetElement(info));//put the new tweet on top the old 1
    });
  }

  //calculate time
  const timePass = function(created) { //think this is pretty english, so just read
    const now = Date.now();
    const pastSec = Math.floor((now - created) / 1000);
    if ((pastSec / 31536000) > 1) {
      return Math.floor(pastSec / 31536000) + ((pastSec / 31536000) >= 2 ? " Years ago" : " Year ago");
    } else if ((pastSec / 2592000) > 1) {
      return Math.floor(pastSec / 2592000) + ((pastSec / 2592000) >= 2 ? " Months ago" : " Month ago")
    } else if ((pastSec / 86400) > 1) {
      return Math.floor(pastSec / 86400) + ((pastSec / 86400) >= 2 ? " Days ago" : " Day ago");
    } else if ((pastSec / 3600) > 1) {
      return Math.floor(pastSec / 3600) + ((pastSec / 3600) >= 2 ? " Hours ago" : " Hour ago");
    } else if ((pastSec / 60) > 1) {
      return Math.floor(pastSec / 60) + ((pastSec / 60) >= 2 ? " Mintues ago" : "Mintue ago");
    } else {
      return Math.floor(pastSec) + (pastSec >= 2 ? " Seconds ago" : "Second ago");
    }
  }

  const createTweetElement = function(Obj) {

    //start construction of header
    //icon plus handlename
    const $img = $("<img>").addClass("profile-pic").attr("src", Obj.user.avatars);
    const $user = $("<a>").addClass("userName").text(Obj.user.name);
    
    const $otherUser = $('<div>').addClass("other-user")
    .append($img)
    .append($user);
    
    //uer @name
    const $handle = $("<div>").addClass("handleName").text(Obj.user.handle);

    //header complete
    const $header = $("<header>").addClass("tweet-header")
    .append($otherUser)
    .append($handle);

    //tweet content
    const $content = $('<p>').addClass("tweet-meat").text(Obj.content.text);
    const $contentStyle = $('<div>').addClass("tweet-content")
    .append($content)

    //start construction of tweet footer
    //date of footer
    const $date = $('<span>').addClass("tweet-date").text(timePass(Obj.created_at))

    //react icon of footer
    const $retweet = $('<i>').addClass("fas fa-retweet")
    const $report = $('<i>').addClass("far fa-flag")
    const $like = $('<i>').addClass("far fa-heart")
    const $icons = $('<span>').addClass("react-icon")
    .append($retweet)
    .append($report)
    .append($like)

    //wrap footer in div
    const $footerwrap = $('<div>').addClass("footer-wrap")
    .append($date)
    .append($icons);

    //complete footer
    const $footer = $('<footer>').addClass('tweet-footer')
    .append($footerwrap)

    //tweet
    const $tweet = $("<article>").addClass("tweet-card")
    .append($header)
    .append($contentStyle)
    .append($footer)

    //construction of effect on side
    const $leftspace = $('<div>').addClass('leftSpacer')
    const $rightspace = $('<div>').addClass('rightSpacer')
    const $sideSpacer = $('<div>').addClass('sideSpacer')
    .append($leftspace)
    .append($tweet)
    .append($rightspace)

    //construction of effect on bottom
    const $bottomeShadow = $('<div>').addClass('shadow');

    //put all item together as one
    const $completeTweet = $('<div>').addClass('focus_effect')
    .append($sideSpacer)
    .append($bottomeShadow);

    return $completeTweet;
  }  
  
  //initial tweet load
  loadtweets();
})