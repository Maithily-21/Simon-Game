
let gameSeq =[];
let userSeq =[];

let btns=["red","yellow","green","purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let startBtn = document.getElementById("startBtn");

// Start game on keypress (desktop)
document.addEventListener("keypress", startGame);

// Start game on button click (mobile)
startBtn.addEventListener("click", startGame);

function startGame() {
    if (!started) {
        started = true;
        startBtn.style.display = "none"; // Hide start button after game starts
        levelup();
    }
}

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelup(){
    userSeq = [];
    level++;
    h2.innerText = `🎯 Level ${level} 🔥`;
    //Choose Random button 
    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
//    let idx = level -1;
   if(userSeq[idx] === gameSeq[idx]){
      if(userSeq.length == gameSeq.length){
        setTimeout(levelup , 1000 );
      }
   }else{
    h2.innerHTML = `😭<br> Game Over! <br>  Your score was ⭐ <b>${level*10} <b> 🎉 Press any key to Restart`;
    reset();
   }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length -1);

}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    startBtn.style.display = "inline-block"; // Show start button again
}