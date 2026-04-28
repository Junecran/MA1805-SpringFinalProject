
// -- Global Data -- //
// Default Game State 
let gameState = "mainMenu"; // Can change for debug (mainMenu,game,transition,instructions)
let gameStarted = false;
let debugMode = true;
// Inputs 
let cameraY = 0;
let targetY = 0;
let menuTransitionSpeed = 0.04;
let menuYPos;
let instructYPos;
let gameYPos;
let mainMenuButtons = [];
let backButton;
// Enemies 
let enemies = [];
let enemySize = 60; 
let maxEnemies = 20; 
let enemySpeedMin = 1.5;
let enemySpeedMax = 3;
let enemySpawnInterval = 120; // Per frame count
let enemySpawnDistance = 80; // Prevents overlap
// Player & Environment 
let spaceship;
let spaceshipHitBoxSize = 20;
let player;
let lastSpawnFrame = 0;
let ropeConstrainLength = 120;
let ropeSmoothness = 0.25;
let looseRopeAmount = 1;
let ropeWiggleAmount = 5;
// Assets 
let mainMenuImg;
let startBG;  
let instructionBG; 
let exitBG; 
let backBG;
let spaceshipImg;
let enemyImg;
let playerImg;



// -- Preload Images -- // 
function preload(){
// Backgrounds  
 mainMenuImg = loadImage("assets/Main_Menu.png");
// Buttons 
 startBG = loadImage("assets/Start_Button_Glow.png");
 instructionBG = loadImage("assets/Instruct_Button_Glow.png");
 exitBG = loadImage("assets/Exit_Button_Glow.png");
 backBG = loadImage("assets/Back_Button_Glow.png");
// Game 
 spaceshipImg = loadImage("assets/spaceship.png");
 enemyImg = loadImage("assets/Enemy.png");
 playerImg = loadImage("assets/player.png");
}



// -- Functions & Setups -- //
// Essentials //
function setup() {
  createCanvas(1280, 720);
  noSmooth(); 

  menuYPos = mainMenuImg.height / 2 - height / 2;
  instructYPos = 0; // Top of image
  gameYPos = mainMenuImg.height - height; // Bottom of image
  cameraY = menuYPos;
  targetY = menuYPos;
}

function draw() {
  if (gameState === "mainMenu") mainMenuState();
  else if (gameState === "transition") menuTransitions();
  else if (gameState === "instructions") InstructionsMenuState();
  else if (gameState === "game") {
    if (!gameStarted)
    startGame();
    updateGame();
  }
}


//  Menus //
function InstructionsMenuState() {
  imageMode(CORNER);
  image(mainMenuImg, 0, 0, width, height, 0, cameraY, width, height);

  backButton = new button(960, 625, 200, 80, backBG, "back"); // Instructions menu back button position ------------->
  backButton.update();
  backButton.show();
  debugDraw(backButton);
}

function mainMenuState() {
  imageMode(CORNER);
  image(mainMenuImg, 0, 0, width, height, 0, cameraY, width, height);
  if (gameState !== "mainMenu") return;

  mainMenuButtons = [ // Main menu buttons position --------------> 
  new button(320, 625, 200, 80, startBG, "start"),
  new button(640, 625, 200, 80, instructionBG, "instruct"),
  new button(960, 625, 200, 80, exitBG, "exit")
  ];

  for (let btn of mainMenuButtons) {
   btn.update();
   btn.show();
   debugDraw(btn);
  }
}

function menuTransitions() {
  imageMode(CORNER);
  image(mainMenuImg, 0, 0, width, height, 0, cameraY, width, height);

  cameraY = lerp(cameraY, targetY, menuTransitionSpeed);
  if (abs(cameraY - targetY) < 1) {
    if (targetY === gameYPos) {
      gameState = "game";
    } else if (targetY === instructYPos) {
      gameState = "instructions";
    } else {
      gameState = "mainMenu";
    }
  }
}


// Game Logic //
function startGame() {
  gameStarted = true;
  lastSpawnFrame = frameCount; 
  spaceship = new playerSpaceship(width / 2, height / 2);
  player = new tetheredPlayer(width / 2, height / 2);
  enemies = [];
 
 for (let i = 0; i < 5; i++) {
    spawnEnemy();
  }
}

function updateGame() {
  background(0); //~~REPLACE WITH SELECTION OF BACKGROUND~~////~~~~~~~~~~~CHANGE WHEN ASSETS ARE DONE~~~~~~~~~~~~~//

  // Spaceship loop
  let hb = spaceship.getHitbox();
  spaceship.update();
  spaceship.show();
  debugDraw(spaceship);

  // Player loop
  player.update(hb.x, hb.y);
  player.show(hb.x, hb.y);

  // Enemy spawn loop
  if (frameCount - lastSpawnFrame > enemySpawnInterval) {
   spawnEnemy();
   lastSpawnFrame = frameCount;
  }
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].update(spaceship);
    enemies[i].show();

  // Enemy collision detection
     if ( enemies[i].x > hb.x - hb.size / 2 && 
      enemies[i].x < hb.x + hb.size / 2 &&
      enemies[i].y > hb.y - hb.size / 2 &&
      enemies[i].y < hb.y + hb.size / 2 ) 
    {
      enemies.splice(i, 1); // Remove enemy on collision
    }
  }
}

// Enemy //
function spawnEnemy() {
  let newEnemy;
  let validSpawn = false; 
  let attempts = 0;

  if (enemies.length >= maxEnemies) return;  // Prevent too many enemies on screen at once
  while (!validSpawn && attempts < 20) { // Find a valid spawn position
    newEnemy = new enemy();
    validSpawn = true;

    for (let e of enemies) {
      if (dist(newEnemy.x, newEnemy.y, e.x, e.y) < enemySpawnDistance) { // If too close to another enemy, mark as not vaild
        validSpawn = false;
        break;
      }
    }
    attempts++;
  }
  enemies.push(newEnemy);
}

// Debug Mode //
function debugDraw(obj) {
  if (!debugMode) return;
  if (obj && typeof obj.debug === "function") {
    obj.debug();
  }
}


// -- Inputs -- //
function mousePressed() {
  if (gameState === "instructions") {
    if (backButton.ishovered) {
      gameState = "transition";
      targetY = menuYPos; 
    }
    return;
  }

  if (gameState !== "mainMenu") return;

  for (let btn of mainMenuButtons) {
    if (!btn.ishovered) continue;

    if (btn.action === "start") {
      gameState = "transition";
      targetY = gameYPos;
    }

    if (btn.action === "instruct") {
      gameState = "transition";
      targetY = instructYPos;
    }

  if (btn.action === "exit") {
  window.location.href = "https://junecran.github.io/MA1805-SpringFinalProject/";
}
  }}


// -- Class -- //
// - Interactive Button - //
class button {
  constructor(x, y, w, h, glowImg, action) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.glowImg = glowImg;
    this.action = action;
    this.ishovered = false;
  }
// Mouse hovering interaction
  update() {
    this.ishovered = (
      mouseX > this.x - this.w / 2 &&
      mouseX < this.x + this.w / 2 &&
      mouseY > this.y - this.h / 2 &&
      mouseY < this.y + this.h / 2
    );
  }

  show() {
    if (this.ishovered) {
      imageMode(CENTER);
      image(this.glowImg, this.x, this.y, this.w, this.h);
    }
  }

  // Debug: To see the Placement of button interaction
  debug() {
    noFill();
    stroke(255, 0, 0);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }
}


// - Spaceship & Player - //
class playerSpaceship {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseY = y;
  }

  update() {
    this.y = this.baseY + sin(frameCount * 0.05) * 10;
  }

  show() {
    imageMode(CENTER);
    image(spaceshipImg, this.x, this.y, 80, 80);
}

// Spaceship hitbox 
  getHitbox() { 
    return {
      x: this.x, 
      y: this.y,
      size: spaceshipHitBoxSize
    };
  }

// Spaceship debug
debug() { 
    let hb = this.getHitbox();
    noFill();
    stroke(255, 0, 0);
    rectMode(CENTER);
    rect(hb.x, hb.y, hb.size, hb.size);
  }
}

class tetheredPlayer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.maxDistance = ropeConstrainLength;
    this.lerpAmount = ropeSmoothness; 
  }

  update(anchorX, anchorY) {
    // Follow mouse
    let targetX = mouseX;
    let targetY = mouseY;

    // Smooth movement
    this.x = lerp(this.x, targetX, this.lerpAmount);
    this.y = lerp(this.y, targetY, this.lerpAmount);

    // Rope length constrain
    let d = dist(this.x, this.y, anchorX, anchorY); 
    if (d > this.maxDistance) {
      let angle = atan2(this.y - anchorY, this.x - anchorX);
      this.x = anchorX + cos(angle) * this.maxDistance;
      this.y = anchorY + sin(angle) * this.maxDistance;
    }
     getHitbox() { 
    return {
      x: this.x, 
      y: this.y,
      size: spaceshipHitBoxSize
    };
  _}
  }

// Rope Tethered Physics //
  show(anchorX, anchorY) {
    let segments = 80; // Rope allowance

    // Distance between anchor and player
    let dx = this.x - anchorX; 
    let dy = this.y - anchorY;
    let distance = dist(anchorX, anchorY, this.x, this.y);

    // Slack calculations
    let stretchRatio = constrain(distance / this.maxDistance, 0, 1); 
    let slack = looseRopeAmount - stretchRatio; 

// Rope Appearance //
  stroke(255);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let i = 0; i <= segments; i++) {
    let t = i / segments; 

    // Basic straight rope position
    let x = anchorX + dx * t; 
    let y = anchorY + dy * t;

    // Perpendicular direction
    let angle = atan2(dy, dx); 
    let perpX = -sin(angle);
    let perpY = cos(angle);
    let fade = sin(t * PI); // Fade for clean attachment

    // Wiggle effect
    let wave = sin(t * PI * 4 + frameCount * 0.05); 
    let wiggleAmount = ropeWiggleAmount * slack; 
    x += perpX * wave * fade * wiggleAmount;
    y += perpY * wave * fade * wiggleAmount;
    curveVertex(x, y);
  }
  endShape();

  // Player Appearance //
  imageMode(CENTER);
  image(playerImg, this.x, this.y, 50, 50);

  }
}


// - Enemy - //
class enemy {
  constructor() {
    let side = floor(random(2)); // Enemy spawn from sides randomly
    this.speed = random(enemySpeedMin, enemySpeedMax); // Enemy speed
    if (side === 0) {
      this.x = -50;
      this.y = random(height);
    } else {
      this.x = width + 50;
      this.y = random(height);
    }
  }

  // Enemy Target //
  update(target) {
    let hb = target.getHitbox(); // target is spaceship hit box
    let angle = atan2(hb.y - this.y, hb.x - this.x);
    this.x += cos(angle) * this.speed; // Move toward spaceship 
    this.y += sin(angle) * this.speed;
  }

  // Enemy Appearance //
  show() {
    imageMode(CENTER);
    image(enemyImg, this.x, this.y, enemySize, enemySize);
  }
}
