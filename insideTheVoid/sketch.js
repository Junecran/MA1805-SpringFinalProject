
// -- Global Data -- //
// Default Game State 
let gameState = "mainMenu"; // Can change for debug (mainMenu,game,transition,instructions)
let gameStarted = false;
let debugMode = false;
// Inputs 
let cameraY = 0;
let targetY = 0;
let menuTransitionSpeed = 0.04;
let menuYPos;
let instructYPos;
let gameYPos;
let mainMenuButtons = [];
let backButton;
let isPaused = false;
let pauseYesButton;
let pauseNoButton;
let pausebuttonHeight = 120;
let pausebuttonWidth = 50;
// Enemies 
let enemies = [];
let enemySize = 50; 
let enemySpeedMin = 1.5;
let enemySpeedMax = 3;
let enemySpawnInterval = 120; // Per frame count
let enemySpawnDistance = 80; // Prevents overlap
// Player & Environment 
let spaceship;
let spaceshipHitBoxSize = 20;
let spaceshipHealth = 10;
let maxSpaceshipHealth = 10;
let playerHitBoxSize = 30;
let player;
let lastSpawnFrame = 0;
let ropeConstrainLength = 120;
let ropeSmoothness = 0.25;
let looseRopeAmount = 1;
let ropeWiggleAmount = 5;
let overlayAlpha = 0;
let overlayTargetAlpha = 0;
let titleGlowAlpha = 0;
let titleGlowTarget = 180;
// Assets 
let mainMenuImg;
let selectedMainMenuImg;
let pauseMenuImg;
let startBG;  
let instructionBG; 
let exitBG; 
let backBG;
let yesB;
let yesBG;
let noB;
let noBG;
let spaceshipImgs = [];
let enemyImg;
let playerImg;
let titleImg;
let titleGlowImg;
let overlayImg;
// Audio
let bgMusic;
let enemyHitSound;
let spaceshipDamageSound;
let Volume = 0.3; 
let uiHoverSound;


// -- Preload Images -- // 
function preload(){
// Backgrounds & Overlays  
 mainMenuImg = loadImage("assets/userInterface/mainMenu.png");
 selectedMainMenuImg = loadImage("assets/userInterface/mainMenu_Selection.png");
 pauseMenuImg = loadImage("assets/userInterface/pauseMenu.png");
 titleImg = loadImage("assets/userInterface/mainMenu_Title.png");
 titleGlowImg = loadImage("assets/userInterface/mainMenu_TitleGlow.png");
 overlayImg = loadImage("assets/userInterface/gameGlow.png");
// Buttons 
 startBG = loadImage("assets/userInterface/startButton_Glow.png");
 instructionBG = loadImage("assets/userInterface/instructButton_Glow.png");
 exitBG = loadImage("assets/userInterface/exitButton_Glow.png");
 backBG = loadImage("assets/userInterface/backButton_Glow.png");
 yesB = loadImage("assets/userInterface/yesButton.png");
 yesBG = loadImage("assets/userInterface/yesButton_Glow.png");
 noB = loadImage("assets/userInterface/noButton.png");
 noBG = loadImage("assets/userInterface/noButton_Glow.png");
// Game 
 spaceshipImgs[0] = loadImage("assets/sprites/spaceship_NoDamage.png");
 spaceshipImgs[1] = loadImage("assets/sprites/spaceship_Stage2.png");
 spaceshipImgs[2] = loadImage("assets/sprites/spaceship_Stage3.png");
 spaceshipImgs[3] = loadImage("assets/sprites/spaceship_Stage4.png");
 enemyImg = loadImage("assets/sprites/enemy.png");
 playerImg = loadImage("assets/sprites/player.png");
 //Audio
 bgMusic = loadSound("assets/audio/backgroundaudio.mp3");
 enemyHitSound = loadSound("assets/audio/enemycollision.mp3")
 spaceshipDamageSound = loadSound("assets/audio/shipdamage.mp3");
 uiHoverSound = loadSound("assets/audio/UIInteract.mp3")
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
function mainMenuState() {
  imageMode(CORNER);
  image(mainMenuImg, 0, 0, width, height, 0, cameraY, width, height);
  updateTitleGlow();

  push();
  tint(255, titleGlowAlpha);
  imageMode(CORNER);
  image(titleGlowImg, 0, 0, width, height, 0, cameraY, width, height); 
  pop();

  imageMode(CORNER); // Title on top
  image(titleImg, 0, 0, width, height, 0, cameraY, width, height);

  if (gameState !== "mainMenu") return;
  mainMenuButtons = [
    new button(250, 624, 219, 88, startBG, "start"),
    new button(640, 624, 219, 88, instructionBG, "instruct"),
    new button(1030, 624, 219, 88, exitBG, "exit")
  ];

  for (let btn of mainMenuButtons) {
    btn.update();
    btn.show();
    debugDraw(btn);
  }
}

function InstructionsMenuState() {
  imageMode(CORNER);
  image(mainMenuImg, 0, 0, width, height, 0, cameraY, width, height);

  backButton = new button(1163, 65, 159, 66, backBG, "back"); // Instructions menu back button position ------------->
  backButton.update();
  backButton.show();
  debugDraw(backButton);
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

function pauseMenuState() {
imageMode(CENTER);
image(pauseMenuImg, width / 2, height / 2, 442, 200); // Pause menu image position ------------->

  // Create buttons
  pauseYesButton = new button(width / 2 - 80, height / 2 + 40, pausebuttonHeight, pausebuttonWidth, yesBG, "yes", yesB); 
  pauseYesButton.update();
  pauseYesButton.show();
  debugDraw(pauseYesButton);

  pauseNoButton = new button(width / 2 + 80, height / 2 + 40, pausebuttonHeight, pausebuttonWidth, noBG, "no", noB );
  pauseNoButton.update();
  pauseNoButton.show();
  debugDraw(pauseNoButton);
}

// Game Logic //
function startGame() {
  gameStarted = true;
  if (!bgMusic.isPlaying()){
    bgMusic.setLoop(true);
    bgMusic.setVolume(Volume);
    bgMusic.play();
  }
  overlayAlpha = 0;
  overlayTargetAlpha = 120;
  lastSpawnFrame = frameCount; 
  spaceship = new playerSpaceship(width / 2, height / 2);
  player = new tetheredPlayer(width / 2, height / 2);
  enemies = [];
  spaceshipHealth = 10;
 
 for (let i = 0; i < 5; i++) {
    spawnEnemy();
  }
}

function updateGame() {
background(0);
imageMode(CORNER);
image(selectedMainMenuImg, 0, 0, 1280, 720);

  if (isPaused) {
    pauseMenuState();
    return; 
  }

  // Spaceship loop
  let hb = spaceship.getHitbox();
  spaceship.update();
  spaceship.show();
  debugDraw(spaceship);

  // Player loop
  let playerHb = player.playerGetHitbox();
  player.update(hb.x, hb.y);
  player.show(hb.x, hb.y);
  debugDraw(player);

  // Enemy spawn loop
  if (frameCount - lastSpawnFrame > enemySpawnInterval) {
   spawnEnemy();
   lastSpawnFrame = frameCount;
  }
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].update(spaceship);
    enemies[i].show();

  // Enemy collision detection /// 
     if ( enemies[i].x > playerHb.x - playerHb.size / 2 && 
      enemies[i].x < playerHb.x + playerHb.size / 2 &&
      enemies[i].y > playerHb.y - playerHb.size / 2 &&
      enemies[i].y < playerHb.y + playerHb.size / 2 ) 
 
    {
      enemyHitSound.setVolume(Volume);
       enemyHitSound.play();
      enemies.splice(i, 1); // Remove enemy on player collision
    }

     else if ( enemies[i].x > hb.x - hb.size / 2 && 
      enemies[i].x < hb.x + hb.size / 2 &&
      enemies[i].y > hb.y - hb.size / 2 &&
      enemies[i].y < hb.y + hb.size / 2 ) 
    {
      spaceshipDamageSound.setVolume(Volume);
      spaceshipDamageSound.play();
      enemies.splice(i, 1); // Remove enemy on ship collision
      spaceshipHealth--; 
   if (spaceshipHealth <= 0) {
   overlayTargetAlpha = 0; // Fade out

    setTimeout(() => {
     gameStarted = false;
     gameState = "transition";
     targetY = menuYPos;
     }, 500); // Delay so fade can happen
    }
   }
  }
  updateOverlay();
  drawOverlay();
}

// Enemy & Health //
function spawnEnemy() {
  let newEnemy;
  let validSpawn = false; 
  let attempts = 0;
  
  while (!validSpawn && attempts < 30) { 
    newEnemy = new enemy();
    validSpawn = true;

    for (let e of enemies) {
      if (dist(newEnemy.x, newEnemy.y, e.x, e.y) < enemySpawnDistance) {
        validSpawn = false;
        break;
      }
    }
    attempts++;
  }

  if (validSpawn) { // Only add enemy if a valid position was found
    enemies.push(newEnemy);
  }
}

function getDamageStage(health) {
  if (health >= 8) return 0;
  else if (health >= 5) return 1;
  else if (health >= 1) return 2;
  else return 3;
}

// Effects //
function updateOverlay() {
  let healthRatio = spaceshipHealth / maxSpaceshipHealth;  // Health ratio (0 → 1)
  let healthBasedAlpha = map(healthRatio, 0, 1, 10, 120); // Map health to brightness (burning out effect)
  let finalTarget = min(overlayTargetAlpha, healthBasedAlpha);   // Blend with target (for fade in/out still working)
  overlayAlpha = lerp(overlayAlpha, finalTarget, 0.05); // Smooth fade

  // Flicker (stronger when dying = unstable light)
  let flickerStrength = map(healthRatio, 0, 1, 2, 3);
  if (overlayAlpha > 5) {
    let flicker = random(-flickerStrength, flickerStrength);
    overlayAlpha = constrain(overlayAlpha + flicker, 0, 255);
  }
}

function drawOverlay() {
  if (!overlayImg || !spaceship) return;

  push();
  tint(255, overlayAlpha);
  imageMode(CORNER);
  // Calculate vertical offset from ship movement & offset
  let offsetY = spaceship.y - spaceship.baseY;
  image(overlayImg, 0, offsetY * 0.5, width, height);
  pop();
}

function updateTitleGlow() {
  titleGlowAlpha = lerp(titleGlowAlpha, titleGlowTarget, 0.05); // Smooth fade toward target

  // Flicker effect
  let flicker = random(-10, 5);
  titleGlowAlpha = constrain(titleGlowAlpha + flicker, 0, 180);
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
if (gameState === "game" && isPaused) {

 if (pauseYesButton.ishovered) {
  isPaused = false;
  gameStarted = false;
  gameState = "transition";   
  targetY = menuYPos;
 } 

 if (pauseNoButton.ishovered) {
  isPaused = false;
  }
  return;
}

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
  }
}

function keyPressed() {
  if (gameState === "game" && (key === 'e' || key === 'E')) {
    isPaused = !isPaused;
  }
}


// -- Class -- //
// - Interactive Button - //
class button {
constructor(x, y, w, h, glowImg, action, baseImg = null) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.glowImg = glowImg; // Hover image 
  this.baseImg = baseImg; // Default image (optional)

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
  imageMode(CENTER);

  if (this.baseImg) {
    // Pause menu style (base + hover glow)
    image(this.baseImg, this.x, this.y, this.w, this.h);

    if (this.ishovered) {
      image(this.glowImg, this.x, this.y, this.w, this.h);
    }

  } else {
    // Old behavior (main menu)
    if (this.ishovered) {
      image(this.glowImg, this.x, this.y, this.w, this.h);
    }
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

// - Spaceship - //
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

  let stage = getDamageStage(spaceshipHealth);
  image(spaceshipImgs[stage], this.x, this.y, 80, 150);
 }

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

   fill(255);
   textSize(48);
   textAlign(LEFT, TOP);
   text("Health: " + spaceshipHealth, 20, 20);
  }
}

// - Player - //
class tetheredPlayer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.maxDistance = ropeConstrainLength;
    this.lerpAmount = ropeSmoothness; 
  }

  playerGetHitbox() { 
    return {
      x: this.x, 
      y: this.y,
      size: playerHitBoxSize
    };
  }

  debug() { 
   let playerHb = this.playerGetHitbox();
   noFill();
   stroke(255, 0, 0);
   rectMode(CENTER);
   rect(playerHb.x, playerHb.y, playerHb.size, playerHb.size);
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
  image(playerImg, this.x, this.y, 50, 100);

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
