// TOMAGOTCHI GAME LOGIC

// Game state
let gameState = {
    hunger: 100,
    happiness: 100,
    health: 100,
    isSleeping: false,
    isAlive: true,
    age: 0
};

// DOM Elements
const hungerProgress = document.getElementById('hunger-progress');
const happinessProgress = document.getElementById('happiness-progress');
const healthProgress = document.getElementById('health-progress');
const hungerValue = document.getElementById('hunger-value');
const happinessValue = document.getElementById('happiness-value');
const healthValue = document.getElementById('health-value');
const tomagotchiFace = document.getElementById('tomagotchi-face');
const messageArea = document.getElementById('message-area');

// Update UI with current game state
function updateUI() {
    // Update progress bars
    hungerProgress.style.width = gameState.hunger + '%';
    happinessProgress.style.width = gameState.happiness + '%';
    healthProgress.style.width = gameState.health + '%';
    
    // Update values
    hungerValue.textContent = Math.floor(gameState.hunger);
    happinessValue.textContent = Math.floor(gameState.happiness);
    healthValue.textContent = Math.floor(gameState.health);
    
    // Update face based on state
    updateFace();
    
    // Update message area
    if (!gameState.isAlive) {
        messageArea.textContent = "Game Over! 💔";
    } else if (gameState.isSleeping) {
        messageArea.textContent = "Zzz... 😴";
    } else {
        messageArea.textContent = "Welcome to your Tomagotchi! 🌟";
    }
}

// Update Tomagotchi face based on state
function updateFace() {
    if (!gameState.isAlive) {
        tomagotchiFace.innerHTML = '💀';
        return;
    }
    
    if (gameState.isSleeping) {
        tomagotchiFace.innerHTML = '😴';
        return;
    }
    
    // Determine face based on happiness
    if (gameState.happiness > 70) {
        tomagotchiFace.innerHTML = '😊';
    } else if (gameState.happiness > 40) {
        tomagotchiFace.innerHTML = '😐';
    } else {
        tomagotchiFace.innerHTML = '😢';
    }
}

// Game functions
function feed() {
    if (!gameState.isAlive || gameState.isSleeping) return;
    
    gameState.hunger = Math.min(100, gameState.hunger + 20);
    gameState.happiness = Math.max(0, gameState.happiness - 5);
    
    updateUI();
    showMessage("Yum! 😋");
}

function play() {
    if (!gameState.isAlive || gameState.isSleeping) return;
    
    gameState.happiness = Math.min(100, gameState.happiness + 20);
    gameState.hunger = Math.max(0, gameState.hunger - 10);
    
    updateUI();
    showMessage("Fun! 🎉");
}

function clean() {
    if (!gameState.isAlive || gameState.isSleeping) return;
    
    gameState.health = Math.min(100, gameState.health + 15);
    gameState.happiness = Math.max(0, gameState.happiness - 3);
    
    updateUI();
    showMessage("Clean! ✨");
}

function sleep() {
    if (!gameState.isAlive) return;
    
    gameState.isSleeping = !gameState.isSleeping;
    
    if (gameState.isSleeping) {
        showMessage("Zzz... 😴");
    } else {
        showMessage("Woke up! 😊");
    }
    
    updateUI();
}

function resetGame() {
    gameState = {
        hunger: 100,
        happiness: 100,
        health: 100,
        isSleeping: false,
        isAlive: true,
        age: 0
    };
    
    updateUI();
    showMessage("Game reset! 🔄");
}

function showMessage(text) {
    messageArea.textContent = text;
    
    // Clear message after 2 seconds
    setTimeout(() => {
        if (!gameState.isSleeping && gameState.isAlive) {
            messageArea.textContent = "Welcome to your Tomagotchi! 🌟";
        }
    }, 2000);
}

// Game loop - gradually decrease stats
function gameLoop() {
    if (gameState.isAlive && !gameState.isSleeping) {
        gameState.hunger = Math.max(0, gameState.hunger - 0.5);
        gameState.happiness = Math.max(0, gameState.happiness - 0.3);
        gameState.health = Math.max(0, gameState.health - 0.2);
        
        // Check if dead
        if (gameState.hunger <= 0 || gameState.happiness <= 0 || gameState.health <= 0) {
            gameState.isAlive = false;
        }
    }
    
    updateUI();
}

// Initialize the game
updateUI();

// Start game loop
setInterval(gameLoop, 1000);