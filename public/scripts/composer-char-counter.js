$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on('input', function() {
    var count = $(this).val().length;
    if (count <= 140) {
      $(this).siblings().children('.counter').text(140 - count).css("color", '#333333');
    } else if (count > 140){
      $(this).siblings().children('.counter').text(140 - count).css("color", "red");
    }
  });
});

