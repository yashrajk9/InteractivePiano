let video;
let handPose;
let poses = [];
let currentScreen = "start";

// Piano variables
let pianoSynth;
const pianoNotes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
const pianoRectWidth = 65;
const pianoRectHeight = 150;
let pianoHasPlayed = new Array(pianoNotes.length).fill(false);

// Canvas dimensions
const canvasWidth = 500;
const canvasHeight = 500;

// Horizontal line variables
let direction = 1; // 1 for left to right, -1 for right to left
let keyCount = 0;
let startX = 100;
let endX = canvasWidth - 100;
let currentX = startX;
let keyY = 50;
let leftSide = true; // Flag to determine which side to place the key

// Twinkle Twinkle Little Star notes
const twinkleNotes = [
  "C4", "C4", "G4", "G4", "A4", "A4", "G4",
  "F4", "F4", "E4", "E4", "D4", "D4", "C4",
  "G4", "G4", "F4", "F4", "E4", "E4", "D4",
  "G4", "G4", "F4", "F4", "E4", "E4", "D4",
  "C5"
];

let currentNoteIndex = 0;
let currentKey = { x: 0, y: 0, note: "" };

// Image variables
let bgImage;
let startImage;
let imageOpacity = 0;
let asset;

function preload() {
  handPose = ml5.handPose();
  bgImage = loadImage('vg.jpg');
  startImage = loadImage('vga.png');
  asset = loadImage('asset.png');
}

function setup() {
  let cnv = createCanvas(canvasWidth, canvasHeight);
  centerCanvas(cnv);
  
  video = createCapture(VIDEO);
  video.size(canvasWidth, canvasHeight);
  video.hide();
  
  handPose.detectStart(video, gotPoses);
  
  pianoSynth = new Tone.PolySynth(Tone.Synth).toDestination();
  Tone.start();
  textFont('Georgia');
}

function gotPoses(results) {
  poses = results;
}

function draw() {
  drawBackground();
  drawVideoFeed();
  
  if (currentScreen === "piano") {
    drawBackgroundImage();
  }
  
  if (currentScreen === "start") {
    drawStartScreen();
  } else if (currentScreen === "piano") {
    drawPiano();
  }
  
  drawHandIndicator();
  drawFullscreenButton();
}

function drawBackground() {
  for (let i = 0; i < height; i++) {
    let c = lerpColor(color(135, 206, 250), color(255, 255, 255), i / height);
    stroke(c);
    line(0, i, width, i);
  }
}

function drawVideoFeed() {
  tint(255, 200);
  image(video, 0, 0, width, height);
}

function drawBackgroundImage() {
  tint(255, imageOpacity);
  image(bgImage, 0, 0, width, height);
  noTint();
}

function drawStartScreen() {
   image(asset,-15,200,width+40,350);
  // Display the text
  textSize(18);
  fill(255);
  textAlign(LEFT, CENTER);
  text("Not all masterpieces are painted—\nsome are played. Show me yours.", 20, height / 2 - 160, width - 10);
  textAlign( CENTER);
  text("Interact by pointing your index finger via webcam.",20, height - 25, width - 10);
  
  
  // Display the image
  let imgWidth = 150;
  let imgHeight = imgWidth * (startImage.height / startImage.width);
  image(startImage, width - imgWidth - 20, height / 2 - 250, imgWidth, imgHeight);
  
  // Draw the "Let's Begin!" button
  drawButton(width / 2, height - 200, "Let's Begin!");
  
  checkStartScreenInteraction();
}

function drawPiano() {
  if (currentNoteIndex < twinkleNotes.length) {
    if (currentKey.note === "") {
      generateNewKey();
    }
    
    drawCurrentKey();
    checkKeyInteraction();
  } else {
    displayCongratulations();
  }
  
  drawBackToMenuButton();
}

function generateNewKey() {
  currentKey.note = twinkleNotes[currentNoteIndex];
  if (leftSide) {
    currentKey.x = startX;
  } else {
    currentKey.x = endX - pianoRectWidth;
  }
  currentKey.y = keyY;

  leftSide = !leftSide; // Toggle the side for the next key

  currentNoteIndex++;
}

function drawCurrentKey() {
  fill(255);
  rect(currentKey.x, currentKey.y, pianoRectWidth, pianoRectHeight);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(currentKey.note, currentKey.x + pianoRectWidth / 2, currentKey.y + pianoRectHeight / 2);
}

function checkKeyInteraction() {
  if (poses.length > 0) {
    let indexFinger = poses[0].index_finger_tip;
    if (
      indexFinger.x > currentKey.x &&
      indexFinger.x < currentKey.x + pianoRectWidth &&
      indexFinger.y > currentKey.y &&
      indexFinger.y < currentKey.y + pianoRectHeight
    ) {
      pianoSynth.triggerAttackRelease(currentKey.note, "8n");
      currentKey.note = "";
      
      // Increase image opacity
      imageOpacity = min(255, imageOpacity + (255 / twinkleNotes.length));
    }
  }
}

function displayCongratulations() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Bravo !", width / 2, height / 2);
}

function drawHandIndicator() {
  if (poses.length > 0) {
    let indexFinger = poses[0].index_finger_tip;
    fill(255, 0, 0);
    noStroke();
    circle(indexFinger.x, indexFinger.y, 15);
  }
}

function drawFullscreenButton() {
  fill(0, 255, 0);
  noStroke();
  rectMode(CORNER);
  rect(width - 60, 10, 50, 30, 5);
  fill(0);
  textSize(12);
  textAlign(CENTER, CENTER);
  text("Full", width - 35, 25);
}

function mousePressed() {
  if (
    mouseX > width - 60 &&
    mouseX < width - 10 &&
    mouseY > 10 &&
    mouseY < 40
  ) {
    let fs = fullscreen();
    fullscreen(!fs);
    resizeCanvas(canvasWidth, canvasHeight);
    centerCanvas(canvas);
  }
}

function centerCanvas(cnv) {
  cnv.style('display', 'block');
  cnv.style('position', 'absolute');
  cnv.style('left', '50%');
  cnv.style('top', '50%');
  cnv.style('transform', 'translate(-50%, -50%)');
}

function drawButton(x, y, label) {
  noStroke();
  fill(255, 255, 255, 200);
  rectMode(CENTER);
  rect(x, y, 150, 60, 10);
  fill(50);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

function checkStartScreenInteraction() {
  if (poses.length > 0) {
    let indexFinger = poses[0].index_finger_tip;
    if (isHovering(indexFinger, width / 2, height - 200)) {
      currentScreen = "piano";
    }
  }
}

function drawBackToMenuButton() {
  drawButton(width / 2, height - 100, "Back to Menu");
  if (poses.length > 0) {
    let indexFinger = poses[0].index_finger_tip;
    if (isHovering(indexFinger, width / 2, height - 100)) {
      currentScreen = "start";
      currentNoteIndex = 0;
      currentKey.note = "";
      resetHorizontalVariables();
      imageOpacity = 0; // Reset image opacity when returning to menu
    }
  }
}

function resetHorizontalVariables() {
  direction = 1;
  keyCount = 0;
  currentX = startX;
  leftSide = true;
}

function isHovering(indexFinger, x, y) {
  let hoverRadius = 75;
  return dist(indexFinger.x, indexFinger.y, x, y) < hoverRadius;
}
