// Ideas -> audio element of start and crash and game starting like 3,2,1 ..
// Accessing the elements
const score=document.querySelector('.score');
const highScore = document.querySelector('.highScore');
const gameArea=document.querySelector(".gameArea");
const startScreen = document.querySelector(".startScreen");
const clickToStart = document.querySelector(".clickToStart");

const audio_element=new Audio('sounds/car_moving.wav');
// Events
clickToStart.addEventListener("click",start);
document.addEventListener("keydown",keyDown);
document.addEventListener("keyup",keyUp)

let keys = {
    ArrowUp : false,
    ArrowDown :false,
    ArrowLeft : false,
    ArrowRight : false
}
let player = {
    speed : 5,
    score : 0,
    highScore : 0,
    isStart : false
};
function keyUp(e){
    keys[e.key]=true;
}
function keyDown(e){
    keys[e.key]=false;
}
//starting the game
function start(){
  audio_element.play();
    gameArea.innerHTML='';
    startScreen.classList.toggle("hide");
    player.isStart = true;
    player.score=0;
    window.requestAnimationFrame(play);
    // creating roadLines
    for(let i=0;i<5;i++){
        let roadLines=document.createElement("div");
        roadLines.setAttribute('class','roadLines');
        roadLines.y=(i*140);
        roadLines.style.top = roadLines.y + "px";  
        gameArea.appendChild(roadLines);
    }
    // creating opponents car
    for(let i=0;i<3;i++){
        let Opponents = document.createElement('div');  
        Opponents.setAttribute('class', 'Opponents');  
        Opponents.y = ((i) * -300);  
        Opponents.style.top = Opponents.y + "px";  
        gameArea.appendChild(Opponents);  
        Opponents.style.left = Math.floor(Math.random() * 45) + "vw";  
        // Opponents.style.backgroundColor=randomColor();  
    }
    let car = document.createElement('div');  
    car.setAttribute('class', 'car');  
    gameArea.appendChild(car);  
    player.x = car.offsetLeft;  
    player.y = car.offsetTop;  
}
// function randomColor(){  
//     function c(){  
//       let hex=Math.floor(Math.random()*256).toString(16);  
//       return ("0"+String(hex)).substr(-2);  
//     }  
//     return "#"+c()+c()+c();  
//   }  
  //play the game  
  function play() {  
    let car = document.querySelector('.car');  
    let road = gameArea.getBoundingClientRect();  
    if (player.isStart) {  
      moveLines();  
      moveOpponents(car);  
      if (keys.ArrowDown && player.y > (road.top + 70)) { player.y -= player.speed }  
      if (keys.ArrowUp && player.y < (road.height - 75)) { player.y += player.speed }  
      if (keys.ArrowLeft && player.x < 45  ) { player.x += .1*player.speed }  
      if (keys.ArrowRight && player.x > 0) { player.x -= .1*player.speed }  
      car.style.top = player.y + "px";  
      car.style.left = player.x + "vw";  
      highScore.innerText = "HighScore" + ":" + (player.highScore - 1);  
      player.score++;  
      player.speed += 0.01;  
      if (player.highScore < player.score) {  
        player.highScore++;  
        highScore.innerText = "HighScore" + ":" + (player.highScore - 1);  
        highScore.style.top="80px";  
      }  
      if(audio_element.currentTime == audio_element.duration){
        audio_element.play();
      }
      score.innerText = "Score" + ":" + (player.score - 1);  
      window.requestAnimationFrame(play);  
    }  
  }  
  function moveLines() {  
    let roadLines = document.querySelectorAll('.roadLines');  
    roadLines.forEach(function (item) {  
      if (item.y >= 700)  
        item.y -= 700;  
      item.y += player.speed;  
      item.style.top = item.y + "px";  
    })  
  }  
  function moveOpponents(car) {  
    let Opponents = document.querySelectorAll('.Opponents');  
    Opponents.forEach(function (item) {  
      if (isCollide(car, item)) {  
        endGame();  
      }  
      if (item.y >= 750) {  
        item.y -= 900;  
        item.style.left = Math.floor(Math.random() * 45) + "vw";  
      }  
      item.y += player.speed;  
      item.style.top = item.y + "px";  
    })  
  }  
  //check whether the cars collide or not  
  function isCollide(a, b) {  
    aRect = a.getBoundingClientRect();  
    bRect = b.getBoundingClientRect();  
    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right))  
  }  
  //game is end  
  function endGame() {  
    audio_element.pause();
    player.isStart = false;  
    player.speed = 5;  
    startScreen.classList.remove('hide');  
  }  