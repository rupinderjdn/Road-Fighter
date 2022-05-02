// Ideas -> audio element of start and crash and game starting like 3,2,1 ..
// Accessing the elements
const score=document.querySelector('.score');
const highScore = document.querySelector('.highScore');
const gameArea=document.querySelector(".gameArea");
const startScreeen = document.querySelector(".startScreeen");
const clickToStart = document.querySelector(".clickToStart");

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
    gameArea.innerHTML='';
    startScreeen.classList.toggle('hide');
    player.isStart = true;
    player.score=0;
    
}