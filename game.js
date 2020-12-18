// Available colors in the game
var buttonColours = ["red", "blue", "green", "yellow"];

// Initialise the variables of the game
var gamePattern = [];
var userClickedPattern = [];
var started = false;

// Create a variable for level count and set to zero at game start
var level = 0;


// Start the Game on key press!
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// Storing the user clicks and adding functionalities and animation to the button clicks
$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


// Checking the answer in response to the user clicks
function checkAnswer(currentLevel) {
  // Checking the game color sequence with the user color selection sequence
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // If user gets the sequence wrong, notifying that game is over and reseting the game
    $("#level-title").text("Game Over, Press Any Key to Restart");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}



// FUNCTION DEFINITION SECTION

// Creating a new color game pattern
function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  // Randomly deciding the next color
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Providing flash effect to the color selected
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  // Adding sounds to the colors selected
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();

}


// Game sound effect function
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// Game animation function
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

// Game reset function
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}