let gameSequence = [];
let userSequence = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Load sounds
let sounds = {
    red: new Audio("sounds/click.mp3"),
    yellow: new Audio("sounds/click.mp3"),
    green: new Audio("sounds/click.mp3"),
    purple: new Audio("sounds/click.mp3"),
    wrong: new Audio("sounds/beep.mp3")
};

// Start game on keypress or touch
function startGame() {
    if (!started) {
        started = true;
        levelup();
    }
}
document.addEventListener("keypress", startGame);
document.addEventListener("touchstart", startGame, { once: true });

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
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key or tap to restart`;
        
        // Add red background and game-over effects
        document.body.classList.add("wrong-background", "game-over");
        setTimeout(() => {
            document.body.classList.remove("wrong-background", "game-over");
        }, 2000);

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
