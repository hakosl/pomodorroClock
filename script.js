var currentIntervalId;
var countDown = function(time, type){
  if(currentIntervalId){
    clearInterval(currentIntervalId)
  }
  $(".mode").text(type)

  currentIntervalId = setInterval(function(){
    time--;

    minutes = parseInt(time / 60, 10);
    seconds = parseInt(time % 60, 10);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    $( ".time" ).text(minutes + ":" + seconds);
    

    remaingingTime = time;
    currentType = type;

    if(time <= 0){
      clearInterval(currentIntervalId);
      makeNoise();
      if(type === "Session"){
        countDown(5 * 60, "Break")
      }else if(type === "Break"){
        countDown(25 * 60, "Session")
      }

    }
  }, 1000)
  
}

var pauseInterval = function(){
  clearInterval(currentIntervalId);
  timerActive = false;
}

var startInterval = function() {
  countDown(remaingingTime, currentType)
  timerActive = true;
};

var pauseAndStopInterval = function() {
  console.log(timerActive)
  if(timerActive){
    pauseInterval();
  }else if(!timerActive){
    timerActive = true;
  }
}

var resetInterval = function () {
  countDown(defaultTime, defaultMode );
}

var makeNoise = function () {
  var audio = new Audio('audio_file.mp3');
  audio.play();

}

var defaultTime = 25 * 60;
var defaultMode = "Session";
var timerActive = true;

$(document).ready(function(){
  countDown(defaultTime, defaultMode );
});