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


//animation

function animate() {
    window.requestAnimationFrame(animate);
    context.clearRect(0, 0, w, h);   
    // you.move(); 
    you.gravity(); 
    context.drawImage(playerBirdImg, you.x, you.y, you.width, you.height);
}

animate(); 

//collision detection

function detectCollision(player, obj) {
    if (
      player.x < obj.x + obj.w &&
      player.x + player.w > obj.x &&
      player.y < obj.y + obj.h &&
      player.y + player.h > obj.y
    ) {
      player.speedY = 0;
    } else {
      return false;
    }
  }

  detectCollision(you, canvas)