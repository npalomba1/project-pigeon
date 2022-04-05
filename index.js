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
    // gravity () {
    //     this.x += this.speedX; //might not even need this
    //     this.y += this.speedY; 
    // }
}

let you = new Player();

                   

//the event listeners, the movements for the player


document.addEventListener('keydown', function(ev){ //player flying up 
    if (ev.code === "Space") {
        you.speedY = -5; 
    }
}) 

document.addEventListener('keyup', function(ev){ //recreation of gravity
    you.speedY = 7;
})

//animation

function animate() {
    window.requestAnimationFrame(animate);
    context.clearRect(0, 0, w, h); 
    you.move(); 
    // you.gravity(); 
    context.fillRect(you.x, you.y, you.width, you.height);
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
      return true;
    } else {
      return false;
    }
  }