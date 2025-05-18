let gameSequence = [];
let userSequence = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let startBtn = document.querySelector(".start-btn");
let restartBtn = document.querySelector(".restart-btn");

// Load sounds
let sounds = {
    red: new Audio("sounds/click.mp3"),
    yellow: new Audio("sounds/click.mp3"),
    green: new Audio("sounds/click.mp3"),
    purple: new Audio("sounds/click.mp3"),
    wrong: new Audio("sounds/beep.mp3")
};

// How to Play button functionality
document.querySelector(".how-to-play-btn").addEventListener("click", function() {
    document.querySelector(".instructions").style.display = "block";
});

document.querySelector(".close-instructions").addEventListener("click", function() {
    document.querySelector(".instructions").style.display = "none";
});

// Start game with button
startBtn.addEventListener("click", function() {
    startGame();
    startBtn.style.display = "none";
});

// Restart game with button
restartBtn.addEventListener("click", function() {
    startGame();
    restartBtn.style.display = "none";
});

// Start game function
function startGame() {
    if (!started) {
        started = true;
        level = 0;
        gameSequence = [];
        userSequence = [];
        levelup();
    }
}

// Flash button (game-generated)
function gameFlash(btn) {
    btn.classList.add("flash");
    sounds[btn.id].play();
    setTimeout(() => btn.classList.remove("flash"), 500);
}

// Flash button (user click)
function userFlash(btn) {
    btn.classList.add("userflash");
    sounds[btn.id].play();
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

// Advance to next level
function levelup() {
    userSequence = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSequence.push(randColor);
    setTimeout(() => gameFlash(randBtn), 500);
    console.log("Game sequence:", gameSequence);
}

// Handle user button click
function btnPress() {
    if (!started) return;
    
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSequence.push(userColor);

    checkAnswer(userSequence.length - 1);
}

// Check user input against game sequence
function checkAnswer(currentIdx) {
    if (userSequence[currentIdx] === gameSequence[currentIdx]) {
        if (userSequence.length === gameSequence.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        // Wrong input
        sounds.wrong.play();
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>`;
        
        // Add red background and game-over effects
        document.body.classList.add("wrong-background", "game-over");
        setTimeout(() => {
            document.body.classList.remove("wrong-background", "game-over");
        }, 2000);

        // Show restart button
        restartBtn.style.display = "block";
        
        resetGame();
    }
}

// Reset game variables
function resetGame() {
    started = false;
    gameSequence = [];
    userSequence = [];
    level = 0;
}

// Add event listeners to buttons
let allBtns = document.querySelectorAll(".btn");
for (const btn of allBtns) {
    btn.addEventListener("click", btnPress);
}