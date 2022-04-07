document.getElementById('start-button').onclick = function() {
        startGame();
    }



let point = document.getElementById('score');
    function scoreCounter() {
        point.innerHTML = Number(point.innerHTML) + 1;
        console.log(point)
    }

let gameOn = false

let int1
let int2
let int3

function startGame() {
    if (gameOn === false) {
        gameOn = true;
        int1 = setInterval(buildingGenerator, 2000);
        int2 = setInterval(enemiesGenerator, 1000);
        int3 = setInterval(bagelGenerator, 3000);
        point.innerHTML = 0;
        animate()
    }
}


    //create the canvas
    const canvas = document.getElementById('canvas');
    canvas.height = 500;
    canvas.width = 1000;
    const context = canvas.getContext('2d');

    const w = canvas.width;
    const h = canvas.height;

    //Create the Player Class
    class Player {
        constructor() {
            this.x = w / 2 - 350;
            this.y = h / 2 + 50;
            this.width = 70;
            this.height = 50;
            this.score = 0;
            this.speedX = 0;
            this.speedY = 0;
            this.color = 'black' //this will be for the test rectangle before I add an image for the player
        }
        move() {
            this.x += this.speedX; //might not even need this 
            this.y += this.speedY;
        }
        gravity() {
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
    
    // let point = document.getElementById('score');

    //the event listeners, the movements for the player


    document.addEventListener('keydown', function (ev) { //player flying up 
        if (ev.code === "Space") {
            if (you.y - 10 < 0) {
                you.speedY = 5;
            } else {
                you.speedY = -5;
            }
        }

    })

    document.addEventListener('keyup', function (ev) { //recreation of gravity
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

    // setInterval(buildingGenerator, 2000)

    let greenBuilding = new Image();
    greenBuilding.src = 'projectPigeonImages/green-building.png';
    greenBuilding.onload = function () {
        // context.drawImage(greenBuilding, obstaclesArr[i].x, obstaclesArr[i].y, obstaclesArr[i].width, obstaclesArr[i].height)
    }


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

    // setInterval(enemiesGenerator, 1000)

    let enemyUFO = new Image();
    enemyUFO.src = 'projectPigeonImages/ufo.png';
    enemyUFO.onload = function () {
        // context.drawImage(enemyUFO, enemiesArr[i].x, enemiesArr[i].y, enemiesArr[i].width, enemiesArr[i].height)
    }



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
        bagelArr.push(new Bagel(40, 40))

    }

    // setInterval(bagelGenerator, 3000);

    let bagelIMG = new Image();
    bagelIMG.src = 'projectPigeonImages/bagels.png';
    // bagelIMG.onload = function () {
    //     context.drawImage(bagelIMG, bagelArr[i].x, bagelArr[i].y, bagelArr[i].width, bagelArr[i].height)
    // }

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
            context.drawImage(greenBuilding, obstaclesArr[i].x, obstaclesArr[i].y, obstaclesArr[i].width, obstaclesArr[i].height);
            obstaclesArr[i].x -= 5;


            //collision detection for buildings
            let didCollide = detectCollision(you, obstaclesArr[i])
            if (didCollide) {
                console.log("you lost")
                gameOver(); 
                window.cancelAnimationFrame(game);
            }
        }
        //enemies generating 
        for (let i = 0; i < enemiesArr.length; i++) {
            // let enemyUFO = new Image();
            // enemyUFO.src = 'projectPigeonImages/ufo.png';
            // enemyUFO.onload = function() {
            //     context.drawImage(enemyUFO, enemiesArr[i].x, enemiesArr[i].y, enemiesArr[i].width, enemiesArr[i].height)
            // }
            context.drawImage(enemyUFO, enemiesArr[i].x, enemiesArr[i].y, enemiesArr[i].width, enemiesArr[i].height)

            enemiesArr[i].flyAttack();

            //collision detection for enemies
            let didAbducted = detectCollision(you, enemiesArr[i])
            if (didAbducted) {
                console.log("you lost")
                gameOver(); 
                window.cancelAnimationFrame(game);
            }
        }

        //bagels generating
        for (let i = 0; i < bagelArr.length; i++) {
            context.fillStyle = 'white';
            context.drawImage(bagelIMG, bagelArr[i].x, bagelArr[i].y, bagelArr[i].width, bagelArr[i].height);
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

    // animate();

    //collision detection

    function detectCollision(player, obj) {
        if (
            player.x < obj.x + obj.width - 10 &&
            player.x + player.width + 10 > obj.x &&
            player.y < obj.y + obj.height - 10 &&
            player.y + player.height - 10 > obj.y
        ) {
            //   player.speedY = 0;
            return true;
        } else {
            return false;
        }
    }

    function gameOver() {
        clearInterval(int1)
        clearInterval(int2)
        clearInterval(int3)
        context.clearRect(0, 0, w, h);
        context.fillStyle = 'white';
        context.font = "18px  'Press Start 2P'";
        context.fillText('Game Over: Press Start to Try Again', 200, 375);
        gameOn = false;
        obstaclesArr = [];
        bagelArr = [];
        enemiesArr = [];

    }

    //   detectCollision(you, obstaclesArr[i])


