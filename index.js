//create the canvas
const canvas = document.getElementById('canvas'); 
canvas.height = 500;
canvas.width = 1000; 
const context = canvas.getContext('2d'); 

const w  = canvas.width; 
const h = canvas.height;

//Create the Player Class
class Player {
    constructor() {
        this.x = w/2 - 350;
        this.y = h/2 + 50;
        this.width = 70;
        this.height = 50;
        this.score = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.color = 'black' //this will be for the test rectangle before I add an image for the player
    }
    move () {
        this.x += this.speedX; //might not even need this 
        this.y += this.speedY; 
    }
    gravity () {
        this.x += this.speedX; //might not even need this
        this.y += this.speedY;   
        if (this.y + this.height > h) {
            this.speedY = 0;
            this.y = h - this.height
        }
    }
}

//creating the player and setting up to draw the player's image YOU MUST LOOK INTO ANIMATING THE GIF LATER
let you = new Player();

const playerBirdImg = new Image()
playerBirdImg.src = 'projectPigeonImages/bluebird.gif';
playerBirdImg.onload = function () {
    context.drawImage(playerBirdImg, you.x, you.y, you.width, you.height)
}
        
// creating score counting function 
function scoreCounter () {
    let point = document.getElementById('score');
    point.innerHTML = Number(point.innerHTML) + 1; 
    console.log(point)
}
// let point = document.getElementById('score');

//the event listeners, the movements for the player


document.addEventListener('keydown', function(ev){ //player flying up 
    if (ev.code === "Space") { 
        if (you.y - 10 < 0) {
            you.speedY = 0;
        } else {
            you.speedY = -5; 
        }   
    }     
       
})   

document.addEventListener('keyup', function(ev){ //recreation of gravity
        you.speedY = 10;  
})

//create the obstacle class  
class Obstacle {
    constructor() {
        this.x = 950;
        this.y = 200 + Math.random() * 150;
        this.width = 100;
        this.height = 300 + Math.random() * 150;
        this.speedX = 10; 
    }    
}
  
let obstaclesArr = [];

function buildingGenerator() {
    obstaclesArr.push(new Obstacle())
    
}

//building image onload function goes here ***

setInterval(buildingGenerator, 2000)


//create the enemy flyer class

class Enemy {
    constructor() {
        // super(width, height, speedX, speedY)
        this.x = 800;
        this.y = 50;
        this.width = 70;
        this.height = 50;
        this.speedX = 15;
        this.speedY = Math.random() * 3; 
    }

    flyAttack() {
        this.x -= this.speedX;
        this.y += this.speedY;
    }
}

 
// creating the enemy generator here
let enemiesArr = [];

function enemiesGenerator() {
    enemiesArr.push(new Enemy())
    
}

setInterval(enemiesGenerator, 1000)

// creating the bagel points class
class Bagel extends Obstacle {
    constructor(width, height) {
        super()
        // this.x = 950;
        // this.y = 200 + Math.random() * 150;
        this.width = width; 
        this.height = height;

    }
}

//creating the bagel generator here

let bagelArr = []; 

function bagelGenerator() {
    bagelArr.push(new Bagel(20, 20))
    
}

setInterval(bagelGenerator, 3000);

//animation
let game;

function animate() {
    game = window.requestAnimationFrame(animate);
    context.clearRect(0, 0, w, h);   
    // you.move(); 
    you.gravity(); 
    context.drawImage(playerBirdImg, you.x, you.y, you.width, you.height);
    //obstacles generating 
    for (let i = 0; i < obstaclesArr.length; i++) {
        // const item = obstaclesArr[i]; 
        context.fillStyle = 'black';
        context.fillRect(obstaclesArr[i].x, obstaclesArr[i].y, obstaclesArr[i].width, obstaclesArr[i].height);
        obstaclesArr[i].x -= 5;
        

        //collision detection for buildings
        let didCollide = detectCollision(you, obstaclesArr[i])
        if (didCollide) {
            console.log("you lost")
            window.cancelAnimationFrame(game);
        }
    }  
    //enemies generating 
    for (let i = 0; i < enemiesArr.length; i++) {
        context.fillStyle = '#93E9BE';
        context.fillRect(enemiesArr[i].x, enemiesArr[i].y, enemiesArr[i].width, enemiesArr[i].height);
        enemiesArr[i].flyAttack(); 
        
        //collision detection for enemies
        let didAbducted = detectCollision(you, enemiesArr[i])
        if (didAbducted) {
            console.log("you lost")
            window.cancelAnimationFrame(game); 
        }
    }

    //bagels generating
    for (let i = 0; i < bagelArr.length; i++) {
        context.fillStyle = 'white';
        context.fillRect(bagelArr[i].x, bagelArr[i].y, bagelArr[i].width, bagelArr[i].height); 
        bagelArr[i].x -= 5

        //collision detection for bagels
        let didEatBagel = detectCollision(you, bagelArr[i])
        if (didEatBagel) {
            console.log("yum!")
            scoreCounter();
            bagelArr.splice(i, 1);
        }
        
    }
}

animate(); 

//collision detection

function detectCollision(player, obj) {
    if (
      player.x < obj.x + obj.width &&
      player.x + player.width > obj.x &&
      player.y < obj.y + obj.height &&
      player.y + player.height > obj.y
    ) {
    //   player.speedY = 0;
      return true;
    } else {
      return false;
    }
  }

//   detectCollision(you, obstaclesArr[i])