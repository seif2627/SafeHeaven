/* 
 * Saif Majid
 * Jan 3, 2025 | 10:05 pm
 *
 * SafeHeaven is a game where you are trying to avoid collisions with     
 * falling colorful objects from the sky. Your goal is to achieve the     
 * highest  personal  time   possible by staying alive as long as you     
 * can. Have fun!
 */

// Canvas dimensions (400x400 reslution)
var canvasWidth  = 400;
var canvasHeight = 400;

// Mouse position 
var mouseX = 0;
var mouseY = 0;

// Game variables
var gameState      = "intro";
var score          = 0;
var obstacleSpeed  = 2;
var timeGoneBy     = 0;
var gameOver       = false;

// Parallax effect variables
var parallaxX    = 0;
var parallaxY    = 0;
var parallaxMultiplier = 0.05;

// Day/night cycle variables
var isNight       = true; // (True = night / False = morning)
var dayNightCycle = 0;

// Arrays for game objects
var starX     = [];         // Star' x coordinates array
var starY     = [];         // Star' y coordinates array
var obstacles = [];         // Obstacles info      array
var clouds    = [];         // Clouds              array

// Player avatar
var greenGuy = getImage("avatars/leafers-seed"); // (Khan Academy image library)

// Generate stars for night sky
var generateStars = function() {
    for (var i = 0; i < 80; i++) {          // Generating 80 stars
        starX.push(random(-100, 450));      // https://www.w3schools.com/jsref/jsref_push.asp#:~:text=The%20push()%20method%20adds,the%20length%20of%20the%20array.
        starY.push(random(-200, 350));      // expanding the arrays
    }
};

// Generate clouds for day sky
var generateClouds = function() {   // A function that generates 5 clouds
    for (var i = 0; i < 5; i++) {
        clouds.push({               // Adding the clouds to the array
            x: random(0, 400),      // Random x coordinate for each cloud
            y: random(0, 200),      // Random y coordinate for each cloud
            size: random(30, 60)    // The size of each cloud is between 30 and 60
        });
    }
};

// Draw cityscape with parallax effect
var drawCityscape = function() {
    var buildingColor = isNight ? color(80, 80, 80) : color(120, 120, 120); // Java script Ternary Operator (https://www.w3schools.com/react/react_es6_ternary.asp) if isNight true assign 80, 80, 80 if not assign 120, 120, 120
    fill(buildingColor);
    // Code below is the buildings with parallax effect
    rect(-9 + parallaxX * parallaxMultiplier, 100 + parallaxY * parallaxMultiplier, 100, 180, 4);   
    rect(-20 + parallaxX * parallaxMultiplier, 210 + parallaxY * parallaxMultiplier, 120, 190, 7);
    rect(130 + parallaxX * parallaxMultiplier, 19 + parallaxY * parallaxMultiplier, 20, 120, 5);
    rect(110 + parallaxX * parallaxMultiplier, 125 + parallaxY * parallaxMultiplier, 60, 120, 4);
    rect(100 + parallaxX * parallaxMultiplier, 240 + parallaxY * parallaxMultiplier, 80, 170, 3);
    rect(180 + parallaxX * parallaxMultiplier, 160 + parallaxY * parallaxMultiplier, 130, 240, 5);
    rect(310 + parallaxX * parallaxMultiplier, 240 + parallaxY * parallaxMultiplier, 90, 160);
    rect(400 + parallaxX * parallaxMultiplier, 190 + parallaxY * parallaxMultiplier, 90, 186);
    // Ternary Operator, result changes depending on if its night or day time
    fill(greenGuy ? color(50, 50, 50) : color(80, 80, 80));
    rect(-112 + parallaxX * parallaxMultiplier, 371 + parallaxY * parallaxMultiplier, 900, 844);
};

// Draw sky and city background
var drawSkyAndCity = function() {
    // Ternary Operator that changes sky color based on if its night or day time
    background(isNight ? color(9, 2, 84) : color(135, 206, 235));
    // If it is night show stars & a mooon, else show clouds (morning)
    if (isNight) {
        fill(231, 187, 103);
        // Determining the position of each star by going through the arrays (starX & starY)
        for (var i = 0; i < starX.length; i++) {
            rect(starX[i] + parallaxX * parallaxMultiplier, starY[i] + parallaxY * parallaxMultiplier, 3, 3);
        }
        // The moon!
        fill(169, 169, 169);
        ellipse(320 + parallaxX * parallaxMultiplier, 80 + parallaxY * parallaxMultiplier, 60, 60);
        // If isNigh != true then the function draws sun & clouds
    } else {
        // sun
        fill(242, 216, 121);
        ellipse(350 + parallaxX * parallaxMultiplier, 50 + parallaxY * parallaxMultiplier, 80, 80);
        // clouds' positions, sizes, etc..
        fill(255, 255, 255, 150);
        for (var i = 0; i < clouds.length; i++) {
            var cloudX = clouds[i].x + parallaxX * parallaxMultiplier * 0.5;
            var cloudY = clouds[i].y + parallaxY * parallaxMultiplier * 0.5;
            ellipse(cloudX, cloudY, clouds[i].size, clouds[i].size * 0.6);
            ellipse(cloudX + clouds[i].size * 0.4, cloudY, clouds[i].size * 0.8, clouds[i].size * 0.5);
            ellipse(cloudX - clouds[i].size * 0.4, cloudY, clouds[i].size * 0.8, clouds[i].size * 0.5);
        }
    }
    drawCityscape();
};

// A function that updates the mouse position based on movement made by the player
var mouseMoved = function() {
    if (!gameOver && gameState === "play") {
        mouseX = mouseX;
        mouseY = constrain(mouseY, 0, 400);    // The mouse does not move outside of the boundries (the reslution)
    }
    parallaxX = mouseX - 200;
    parallaxY = mouseY - 200;
};

// Draw the intro screen text 
var drawIntroText = function() {
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    // Parallax effect added to the text
    text("SAFEHEAVEN", 200 + parallaxX * parallaxMultiplier, 100 + parallaxY * parallaxMultiplier);
    textSize(16);
    text("WELCOME TO SAFE HEAVEN", 200 + parallaxX * parallaxMultiplier, 300 + parallaxY * parallaxMultiplier);
    text("PRESS ENTER TO BEGIN", 200 + parallaxX * parallaxMultiplier, 330 + parallaxY * parallaxMultiplier);
};

// Draw menu screen
var drawMenu = function() {
    drawSkyAndCity();           // calls the function to draw the background of the game
    fill(255);
    textSize(20);
    // Text with the Parallax effect
    text("YOU HAVE TO AVOID OBSTACLES!", 200 + parallaxX * parallaxMultiplier, 200 + parallaxY * parallaxMultiplier);
    // Draw play button
    fill(0, 255, 0);
    rect(75 + parallaxX * parallaxMultiplier, 263 + parallaxY * parallaxMultiplier, 100, 50);
    // Draw exit button
    fill(255, 0, 0);
    rect(225 + parallaxX * parallaxMultiplier, 263 + parallaxY * parallaxMultiplier, 100, 50);
    fill(255);
    text("PLAY", 125 + parallaxX * parallaxMultiplier, 288 + parallaxY * parallaxMultiplier);
    text("EXIT", 275 + parallaxX * parallaxMultiplier, 288 + parallaxY * parallaxMultiplier);
};

// a function when the game starts
var startGame = function() {
    gameState = "play";     // updating the game state to play
    generateClouds();       // Generating clouds if its morning
    timeGoneBy = 0;         // Time is set to 0
    obstacleSpeed = 2;      // Obstacle speed is set to 2
    score = 0;              // Score  is set to 0
    gameOver = false;       // Game Over is set to false
    obstacles = [];         // Clear obstacles array
    parallaxX = mouseX - 200;
    parallaxY = mouseY - 200;
    isNight = true;         // The game starts with night time
    dayNightCycle = 0;      // The cycle is 0 since the game just stared (cycle + 1 every 3 mins)
};

// Exit the game
var exitGame = function() {
    gameState = "exit";
};

// Increase obstacle speed by 25% every 30 seconds (1800 frames)
var updateObstacleSpeed = function() {
    if (timeGoneBy % 1800 === 0) {     
        obstacleSpeed *= 1.25;
    }
};

// Create a new obstacle
var createObstacle = function() {
    var obstacleSize = random(20, 50);          // Random obstacle size between 20 - 50
    obstacles.push({                            // expanding the obstacle array
        x: random(0, 400 - obstacleSize),       // Random x coordinate
        y: -50,                                 // y coordinate above screen so then it falls down
        color: color(random(255), random(255), random(255)),    // Random obstacle color
        size: obstacleSize
    });
};

// Update obstacles position
var updateObstacles = function() {
    for (var i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].y += obstacleSpeed;        // .y holds the vertical position of the obstacle, + obstacle speed makes the obstacles come down faster.
        // Remove obstacles that have moved below the screen
        if (obstacles[i].y > 400) {
            obstacles.splice(i, 1);     //A method that adds/removes array elements (https://www.w3schools.com/jsref/jsref_splice.asp)
        }
    }
};

// Draw obstacles
var drawObstacles = function() {
    for (var i = 0; i < obstacles.length; i++) {
        fill(obstacles[i].color);               // Goes through each obstacle and sets its color
        ellipse(
            
        obstacles[i].x + obstacles[i].size/2,   // Center ob horizontally (insted of top left the x & y allign with the values in the center of ellipse)
        obstacles[i].y + obstacles[i].size/2,   // Center ob vertically
        obstacles[i].size,                      // Width of the obstacle
        obstacles[i].size                       // Height of the obstacle
        
        );
    }
};

// Draw player character
var drawCharacter = function() {
    image(greenGuy, mouseX - 15, mouseY - 15, 30, 30); // Offset by -15 to ensure its in the center of the mouse and not top left
};

// Update day/night cycle
var updateDayNightCycle = function() {
    dayNightCycle++;    // counts how many frames passed by
    if (dayNightCycle >= 10800) { // when 10800 is reached (3 minutes in 60fps) it becomes day time
        isNight = !isNight;
        dayNightCycle = 0;
    }
};

// Check for collision between player and obstacles (had AI help)
var checkCollision = function() {
    for (var i = 0; i < obstacles.length; i++) {
        var d = dist(mouseX, mouseY, 
        obstacles[i].x + obstacles[i].size/2,   //checking center of obstacle x value
        obstacles[i].y + obstacles[i].size/2);  //checking center of obstacle y value
        if (d < (30 + obstacles[i].size) / 2) { // If the greenGuy (player) hits an obsticle set game over to true and set game state to "gameOver"
            gameOver = true;
            gameState = "gameOver";
        }
    }
};

// Draw play screen
var drawPlayScreen = function() {
    timeGoneBy++;
    updateObstacleSpeed();
    updateDayNightCycle();
    
    // Create new obstacle every 0.5 seconds (30 frames)
    
    if (frameCount % 30 === 0) {
        createObstacle();
    }
    updateObstacles();
    checkCollision();
    drawSkyAndCity();
    drawObstacles();
    drawCharacter();
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);
    text("Score: " + score, 10, 10);
    text("Speed: " + obstacleSpeed.toFixed(2), 100, 10);
    // Increase score every 5 frames
    if (frameCount % 5 === 0) {
        score += 1;
    }
};

// Draw game over screen
var drawGameOver = function() {
    background(0);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    
    // Apply parallax effect to text
    text("GAME OVER!", 200 + parallaxX * parallaxMultiplier, 150 + parallaxY * parallaxMultiplier);
    textSize(20);
    text("Score: " + score, 200 + parallaxX * parallaxMultiplier, 200 + parallaxY * parallaxMultiplier);
    text("Alive for: " + Math.floor(timeGoneBy / 60) + " second(s)", 200 + parallaxX * parallaxMultiplier, 230 + parallaxY * parallaxMultiplier);        //https://www.w3schools.com/jsreF/jsref_floor.asp (math.floro rounds numbers to the nearest int so the user can read it better than if it shows (0.5, 0.6, 0.7, 0.8, etc..))
    text("Obstacle Speed: " + obstacleSpeed.toFixed(2), 200 + parallaxX * parallaxMultiplier, 260 + parallaxY * parallaxMultiplier);
    
    // Apply parallax effect to buttons
    fill(255, 165, 0);      // Restart button
    rect(100 + parallaxX * parallaxMultiplier, 300 + parallaxY * parallaxMultiplier, 100, 50);
    fill(255, 0, 0);        // Exit button
    rect(210 + parallaxX * parallaxMultiplier, 300 + parallaxY * parallaxMultiplier, 100, 50);
    
    fill(0);
    textSize(20);
    text("RESTART", 150 + parallaxX * parallaxMultiplier, 325 + parallaxY * parallaxMultiplier);
    text("EXIT", 260 + parallaxX * parallaxMultiplier, 325 + parallaxY * parallaxMultiplier);
};

// Draw exit screen
var drawExitScreen = function() {
    background(0);
    // Draw the creepy smiley face
    fill(255);  
    ellipse(200 + parallaxX * parallaxMultiplier, 200 + parallaxY * parallaxMultiplier, 100, 100);
    // Draw the creepy face eyes
    fill(0);
    ellipse(180 + parallaxX * parallaxMultiplier, 190 + parallaxY * parallaxMultiplier, 10, 10);
    ellipse(220 + parallaxX * parallaxMultiplier, 190 + parallaxY * parallaxMultiplier, 10, 10);
    // Draw the creepy face smile
    noFill();
    stroke(23, 10, 10);
    strokeWeight(5);
    arc(196 + parallaxX * parallaxMultiplier, 220 + parallaxY * parallaxMultiplier, 9, 30, radians(12), radians(225));
    noStroke();
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("WE WILL MISS YOU!", 200 + parallaxX * parallaxMultiplier, 300 + parallaxY * parallaxMultiplier);
};

// Main draw function
draw = function() {
    if (gameState === "intro") {
        drawSkyAndCity();
        drawIntroText();
    } else if (gameState === "menu") {
        drawMenu();
    } else if (gameState === "play") {
        drawPlayScreen();
    } else if (gameState === "exit") {
        drawExitScreen();
    } else if (gameState === "gameOver") {
        drawGameOver();
    }
};

// Handle key presses
keyPressed = function() {
    if (keyCode === ENTER && gameState === "intro") {
        gameState = "menu";
    }
};

// Handle mouse clicks on buttons
mouseClicked = function() {
    if (gameState === "menu") {
        if (mouseX > 75 && mouseX < 175 && mouseY > 263 && mouseY < 313) {
            startGame();
        } else if (mouseX > 225 && mouseX < 325 && mouseY > 263 && mouseY < 313) {
            exitGame();
        }
    } else if (gameState === "gameOver") {
        if (mouseX > 100 && mouseX < 200 && mouseY > 300 && mouseY < 350) {
            startGame();
        } else if (mouseX > 210 && mouseX < 310 && mouseY > 300 && mouseY < 350) {
            exitGame();
        }
    }
};

// Initialize game objects
generateStars();
generateClouds();