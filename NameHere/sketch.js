
// -- Global Data -- //
// Default Game State 
let gameState = "mainMenu"; // Can change for debug (mainMenu,game,transition,instructions)
let gameStarted = false;
// Inputs 
let cameraY = 0;
let targetY = 0;
let menuTransitionSpeed = 0.01;
let mainMenuButtons = [];
// Enemies 
let enemies = [];
let enemySize = 60; 
let maxEnemies = 20; 
let enemySpeedMin = 1.5;
let enemySpeedMax = 3;
let enemySpawnInterval = 120; // Per frame count
let enemySpawnDistance = 80; // prevents overlap
// Player & Environment 
let spaceship;
let player;
let lastSpawnFrame = 0;
// Assets 
let mainMenuBImg;
let startB, startBG;  
let instructionB, instructionBG; 
let exitB, exitBG; 
let spaceshipImg;
let enemyImg;
let playerImg;



// -- Preload Images-- // 
function preload(){
  // Backgrounds  
  mainMenuBImg = loadImage("assets/Game_Background.png");
  // Buttons 
  startB = loadImage("assets/start_Button.png");
  startBG = loadImage("assets/Start_Button_Glow.png");
  instructionB = loadImage("assets/Instruct_Button.png");
  instructionBG = loadImage("assets/Instruct_Button_Glow.png");
  exitB = loadImage("assets/Exit_Button.png");
  exitBG = loadImage("assets/Exit_Button_Glow.png");
  // Game 
  spaceshipImg = loadImage("assets/spaceship.png");
  enemyImg = loadImage("assets/Enemy.png");
  playerImg = loadImage("assets/player.png");
}


// -- Functions & Setups -- //
// - Essential & Menus - //
function setup() {
  createCanvas(1280, 720);
  noSmooth(); 
  setupMainMenu();
}
function draw() {
 if (gameState === "mainMenu") { 
  drawMainMenu();
}
else if (gameState === "transition"){
  menuTransition();
}
 else if (gameState === "game") {
  if (!gameStarted) startGame();
  drawGame();
  }
}

// Main Menu //
function setupMainMenu() {
  let x = width / 4;
  let y = height - 95;

  mainMenuButtons = [
    new button(x, y, startB, startBG, "start"),
    new button(x * 2, y, instructionB, instructionBG, "instruct"),
    new button(x * 3, y, exitB, exitBG, "exit")
  ];
}
function drawMainMenu() {
  imageMode(CORNER);
  image(mainMenuBImg, 0, 0, width, height, 0, cameraY, width, height);

  if (gameState !== "mainMenu") return;

  for (let btn of mainMenuButtons) {
    btn.update();
    btn.show();
  }
}
function menuTransition() {
  imageMode(CORNER);
  image(mainMenuBImg, 0, 0, width, height, 0, cameraY, width, height);

  cameraY = lerp(cameraY, targetY, menuTransitionSpeed);

  if (abs(cameraY - targetY) < 1) {
    gameState = "game";
  }
}


// - Game Logic - //
function startGame() {
  spaceship = new playerSpaceship(width / 2, height / 2);
  player = new tetheredPlayer(width / 2, height / 2);
  enemies = [];
 
 for (let i = 0; i < 5; i++) {
    spawnEnemy();
  }
   gameStarted = true;
   lastSpawnFrame = frameCount; 
}
function drawGame() {
  background(0); //~~REPLACE WITH SELECTION OF BACKGROUND~~//

  if (frameCount - lastSpawnFrame > enemySpawnInterval) {
    spawnEnemy();
    lastSpawnFrame = frameCount;
  }

  spaceship.update();
  spaceship.show();

  let hb = spaceship.getHitbox();
  player.update(hb.x, hb.y);
  player.show(hb.x, hb.y);

  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].update(spaceship);
    enemies[i].show();

    if (
      enemies[i].x > hb.x - hb.size / 2 &&
      enemies[i].x < hb.x + hb.size / 2 &&
      enemies[i].y > hb.y - hb.size / 2 &&
      enemies[i].y < hb.y + hb.size / 2
    ) {
      enemies.splice(i, 1);
    }
  }
}

// Enemy //
function spawnEnemy() {
  if (enemies.length >= maxEnemies) return;

  let newEnemy;
  let safe = false;
  let attempts = 0;

  while (!safe && attempts < 20) {
    newEnemy = new enemy();
    safe = true;

    for (let e of enemies) {
      if (dist(newEnemy.x, newEnemy.y, e.x, e.y) < enemySpawnDistance) {
        safe = false;
        break;
      }
    }

    attempts++;
  }

  enemies.push(newEnemy);
}



// -- Inputs -- //
function mousePressed() {
  if (gameState !== "mainMenu") return;

  for (let btn of mainMenuButtons) {
    if (!btn.ishovered) continue;

    if (btn.action === "start") {
      gameState = "transition";
      targetY = mainMenuBImg.height - height;
    }

    if (btn.action === "instruct") gameState = "instructions";
    if (btn.action === "exit") gameState = "redirect";
  }
}



// -- Class -- //
// - Interactive Button - //
class button {
  constructor(x, y, img, glowImg, action) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.glowImg = glowImg;
    this.action = action;
    this.ishovered = false;
    // Button Image Sizing -- for best result need to be same number of image pixels
    this.w = 150; //~~~~~~~~~~~CHANGE WHEN ASSETS ARE DONE~~~~~~~~~~~~~//
    this.h = 60; //~~~~~~~~~~~CHANGE WHEN ASSETS ARE DONE~~~~~~~~~~~~~//
  }

// Mouse Hovering Logic //
  update(){ 
    this.ishovered = ( 
      mouseX > this.x - this.w / 2 &&
      mouseX < this.x + this.w / 2 &&
      mouseY > this.y - this.h / 2 &&
      mouseY < this.y + this.h / 2 );
  }

  show(){
    imageMode(CENTER);
    if (this.ishovered)
      { image(this.glowImg, this.x, this.y, this.w, this.h); }
    else 
      { image(this.img, this.x, this.y, this.w, this.h); }
  }
}

// - Spaceship & Player - //
class playerSpaceship {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseY = y;

    // hitbox settings
   
    this.hitboxSize = 20;
  }

  update() {
    this.y = this.baseY + sin(frameCount * 0.05) * 10;
  }

  getHitbox() {
    return {
      x: this.x, 
      y: this.y,
      size: this.hitboxSize
    };
  }

  show() {
    imageMode(CENTER);
    image(spaceshipImg, this.x, this.y, 80, 80);

    // DEBUG: show hitbox (REMOVE LATER)
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

    this.maxDistance = 150; // Rope length
    this.lerpAmount = 0.25; // Smoothness (0–1)
  }

  update(anchorX, anchorY) {
    let targetX = mouseX;// Follow mouse
    let targetY = mouseY;

    this.x = lerp(this.x, targetX, this.lerpAmount);// Smooth movement
    this.y = lerp(this.y, targetY, this.lerpAmount);

// Rope Length Constrain //
    let d = dist(this.x, this.y, anchorX, anchorY); 
    if (d > this.maxDistance) {
      let angle = atan2(this.y - anchorY, this.x - anchorX);
      this.x = anchorX + cos(angle) * this.maxDistance;
      this.y = anchorY + sin(angle) * this.maxDistance;
    }
  }

// Rope Tethered Physics //
  show(anchorX, anchorY) {
    let segments = 20;

  // distance between anchor and player
  let dx = this.x - anchorX;
  let dy = this.y - anchorY;

  let distance = dist(anchorX, anchorY, this.x, this.y);

  // slack (same idea as before)
  let stretchRatio = constrain(distance / this.maxDistance, 0, 1);
  let slack = 1 - stretchRatio;

  stroke(255);
  strokeWeight(2);
  noFill();

  beginShape();

  for (let i = 0; i <= segments; i++) {

    // t goes from 0 → 1 along the rope
    let t = i / segments;

    // basic straight line position
    let x = anchorX + dx * t;
    let y = anchorY + dy * t;

    // perpendicular direction
    let angle = atan2(dy, dx);
    let perpX = -sin(angle);
    let perpY = cos(angle);

    // wave motion
    let wave = sin(t * PI * 4 + frameCount * 0.05);

    // fade wave near ends (so ends stay attached cleanly)
    let fade = sin(t * PI);

    let wiggleAmount = 5 * slack;

    x += perpX * wave * fade * wiggleAmount;
    y += perpY * wave * fade * wiggleAmount;

    curveVertex(x, y);
  }

  endShape();

  // draw player
  imageMode(CENTER);
  image(playerImg, this.x, this.y, 50, 50);

  }
}

// - Enemy - //
class enemy {
  constructor() {
    let side = floor(random(2)); // ONLY left or right

    
    if (side === 0) {
      this.x = -50;
      this.y = random(height);
    } else {
      this.x = width + 50;
      this.y = random(height);
    }

    this.speed = random(enemySpeedMin, enemySpeedMax);
  }

  update(target) {
    let hb = target.getHitbox();

    let angle = atan2(hb.y - this.y, hb.x - this.x);
    this.x += cos(angle) * this.speed;
    this.y += sin(angle) * this.speed;
  }

  show() {
    imageMode(CENTER);
    image(enemyImg, this.x, this.y, enemySize, enemySize);
  }
}
