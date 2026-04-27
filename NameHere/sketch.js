
// -- Global Data -- //
// Defaults
let gameState = "mainMenu";
let gameStarted = false;
let buttons = [];
let cameraY = 0;
let targetY = 0;
let Spacecraft;
let Enemies = []; 

// Asset Data 
let mainMenuBImg;
let startB, startBG;  
let instructionB, instructionBG; 
let exitB, exitBG; 
let SpacecraftImg;
let EnemyImg;

// Changables
let transitionSpeed = 0.01;



// -- Preload -- // 
function preload(){
  mainMenuBImg = loadImage("assets/Game_Background.png");
  startB = loadImage("assets/start_Button.png");
  startBG = loadImage("assets/Start_Button_Glow.png");
  instructionB = loadImage("assets/Instruct_Button.png");
  instructionBG = loadImage("assets/Instruct_Button_Glow.png");
  exitB = loadImage("assets/Exit_Button.png");
  exitBG = loadImage("assets/Exit_Button_Glow.png");
  SpacecraftImg = loadImage("assets/Spacecraft.png");
  EnemyImg = loadImage("Enemy.png");
}



// -- Setup & Fucntions -- //
function setup() {
  createCanvas(1280, 720);
  noSmooth(); 

// Button Positions //
let x = width / 4; // Overall buttons position on the x axis
let y = height - 95; // Overall buttons position on the y axis
mainMenuButtons = [
  new Imagebutton(x, y, startB, startBG, "start"),
  new Imagebutton(x * 2, y, instructionB, instructionBG, "instruct"),
  new Imagebutton(x * 3, y, exitB, exitBG, "exit") ];
}

// Game Background //
function drawGameBackground(){
  imageMode(CORNER);
  image(mainMenuBImg, 0, 0, width, height, 0, cameraY, width, height);
}

// Main Menu //
function mainMenu() {
drawGameBackground();
  if (gameState === "mainMenu") {
    for (let btn of mainMenuButtons) {
      btn.update();
      btn.show();
     }
  }
}

// Screen Transition //
function transitionScreen() {
  drawGameBackground();
  cameraY = lerp(cameraY, targetY, transitionSpeed);

  if (abs(cameraY - targetY) < 1) {
    gameState = "game";
  }
}

//




// -- Inputs -- //
function mousePressed() {
  if (gameState === "mainMenu") { for (let btn of mainMenuButtons) {
    if (btn.ishovered) {

      if (btn.action === "start") 
        { gameState = "transition";
         targetY = mainMenuBImg.height - height; }

      if (btn.action === "instruct") gameState = "instructions"

      if (btn.action === "exit") gameState = "redirect"
    }
  }
}
}



// -- Logic -- //
function draw() {
 if (gameState === "mainMenu") {
  mainMenu();
}
else if (gameState === "transition"){
  transitionScreen();
}
 else if (gameState === "game") {
    drawMap();
    fill(255);
    textSize(30);
    textAlign(CENTER);
    text("GAME STARTED", width / 2, height / 2);
  }
}



// -- Interactive Button Class --//
class Imagebutton {
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