// Enemies our player must avoid 	
var Enemy = function(x, y, max_speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.max = max_speed;
    this.x = x; //initial x position
    this.y = y; // initial y position
    this.sprite = 'images/enemy-bug.png';
};

var level = 0;
var level_speed = 1;

var game_over = 0; //specifies game over

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.	
    // Math.random() * (max - min) + min; generate random numbers between range min to max
    var max = this.max;
    var min = 0.02;
    var speed = Math.random() * (max - min) + min;
    var speed_level = speed * level_speed;
    //console.log(level_speed);

    if (this.x < 505)
    //console.log(dt);
        this.x = this.x + speed_level * ((dt + 1) / dt);

    if (this.x > 504)
        this.x = 0;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {

    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var points = 0;
var set = 0;

var life = 2;
var life_lock = 0;

Player.prototype.update = function() {
    if (this.y < 0) {
        this.y = -10;
        dest_lock = 1;
    }

    /*if(dest_lock && player.y!=-10)
    {
    	dest_lock=0;
    }*/
    if (this.y > 400) {
        this.y = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    //to set the score 

    ctx.font = '35px Arial';
	ctx.fillStyle="black";
    ctx.fillText("Score:" + points, 10, 50);

    if (this.y == -10 && !(set)) {
        points += 1;
        ctx.clearRect(10, 0, 160, 50);
        ctx.fillText("Score:" + points, 10, 50);
        set = 1;

    }

    if (set && this.y != -10) {
        set = 0;
    }

};

var level_lock = 0;
var levels = function() {
    ctx.fillText("Level:" + level, 200, 50);
    if ((points % 5 === 0) && !(level_lock)) {
        level += 1;
        ctx.clearRect(200, 0, 160, 50);
        ctx.fillText("Level:" + level, 200, 50);
        level_speed += 0.5;
        level_lock = 1;
    }
    if (points % 5) {
        level_lock = 0;
    }

};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var max = 0.06;
var min = 0.006;
var max_speed = Math.random() * (max - min) + min;
var enemy = new Enemy(0, 220, max_speed);
max_speed = Math.random() * (max - min) + min;
var enemy1 = new Enemy(0, 130, max_speed);
max_speed = Math.random() * (max - min) + min;
var enemy2 = new Enemy(0, 40, max_speed);
var allEnemies = [enemy, enemy1, enemy2];


var player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.




var dest_lock = 0;
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (!game_over) {
        if ((player.y == -10) && (e.keyCode == '37' || e.keyCode == '39' || e.keyCode == '40' || e.keyCode == '38')) {
            player.y = 400;
            dest_lock = 1;
        }
        if (e.keyCode == '38' && !(dest_lock)) {
            player.y -= 90;
            dest_lock = 0;
            //console.log(player.y);
        }

        if ((dest_lock) && player.y != -10) {
            dest_lock = 0;
        }

        if (e.keyCode == '40') {
            player.y += 90;

        }

        if (e.keyCode == '39') {
            player.x += 100;
        }


        if (e.keyCode == '37') {
            player.x -= 100;
        }

    } // player.handleInput(allowedKeys[e.keyCode]);
});




document.addEventListener('click', function(loc) {
    console.log("x" + loc.clientX + "y" + loc.clientY);
});

//function that detects collision 
var collision = function() {
	if(life)
	{
    ctx.fillText("Life:" + life, 400, 50);
	}
    allEnemies.forEach(function(enemy1) {
        if (player.x >= enemy1.x - 50 && player.x <= enemy1.x + 60) {
            if (player.y >= enemy1.y - 25 && player.y <= enemy1.y + 25) {

                // reduce life when collision occours
                if (!(life_lock)) {
                    life -= 1;
                    ctx.clearRect(400, 0, 180, 70);
                    ctx.fillText("Life:" + life, 400, 50);
                    life_lock = 1;
                }

                if (life_lock && life) {
                    life_lock = 0;
                }

                player.y = 400;
                player.x = 200;
            }
        }

    });
};



var game = function() {
    if (!(life)) {
        ctx.fillStyle = 'black';
		ctx.font='45px Impact';
        ctx.fillText("Game Over", 150, 260);
		ctx.fillText("Score:"+points,170,320);
        game_over = 1;

    }
};

// add time out function

var timeout= function() {
	var date= new Date();
	var start_time= date.getTime();
	
	 ctx.clearRect(400, 0, 180, 70);
     ctx.fillText("Life:" + life, 400, 0);
	
};