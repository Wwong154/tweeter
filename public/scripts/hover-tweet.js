$(document).ready(function() {
  // --- our code goes here ---
  $(".focus_effect").on('mouseover', function() {
    $(".focus_effect").children('.shadow').css("background-color", "skyblue");
    $(".focus_effect").children('.sideSpacer').children('.rightSpacer').css("background-color", "skyblue");
  });

  $(".focus_effect").on('mouseout', function() {
    $(".focus_effect").children('.shadow').css("background-color", "#f4f1ec");
    $(".focus_effect").children('.sideSpacer').children('.rightSpacer').css("background-color", "#f4f1ec");
  });
});
