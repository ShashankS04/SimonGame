
var gamePattern=[];
var buttonColors=["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var started=false;

var level=0;
$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSeq();
        started = true;
      }
});



$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSeq();
        }, 1000);
      }
    } else {
       playSound("wrong");

       $("body").addClass("game-over");
       setTimeout(function () {
         $("body").removeClass("game-over");
       }, 200);
 
       $("#level-title").text("Game Over, Press Any Key to Restart");
       startOver();
     }
    }


function nextSeq(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(Color){
    var audio = new Audio("sounds/" + Color + ".mp3");
    audio.play();
}

function animatePress(color){
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
      }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }