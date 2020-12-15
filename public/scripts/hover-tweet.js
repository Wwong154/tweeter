$(document).ready(function() {
  // --- our code goes here ---
  $(".focus_effect").on('mouseover', function() {
    $(this).children('.shadow').css("visibility", "visible");
    $(this).children('.sideSpacer').children('.rightSpacer').css("visibility", "visible");
    $(this).children('.sideSpacer').children('article').children('.tweet-header').children('.handleName').css("visibility", "visible");
    $(this).children('.sideSpacer').children('article').children('.tweet-content').css("font-weight", "600");
    $(this).children('.sideSpacer').children('article').children('.tweet-header').children('.other-user').css("font-weight", "700");
  });

  $(".focus_effect").on('mouseout', function() {
    $(this).children('.shadow').css("visibility", "hidden");
    $(this).children('.sideSpacer').children('.rightSpacer').css("visibility", "hidden");
    $(this).children('.sideSpacer').children('article').children('.tweet-header').children('.handleName').css("visibility", "hidden");
    $(this).children('.sideSpacer').children('article').children('.tweet-content').css("font-weight", "300");
    $(this).children('.sideSpacer').children('article').children('.tweet-header').children('.other-user').css("font-weight", "400");
  });
});
