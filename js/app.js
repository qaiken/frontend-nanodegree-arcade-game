// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = Math.random() * 75 + 50;
    this.x = x;
    this.y = y;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if(this.x > canvas.width + 50)
      this.x = -100;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = canvas.width / 2 - 50;
  this.y = canvas.height - 175;
};

Player.prototype.update = function(dir,amount) {
  if(amount) {
    var new_pos = this[dir] + amount;
    console.log(new_pos);
    if( !new_pos ||
      new_pos > canvas.width ||
      new_pos < 0 ||
      new_pos > (canvas.height - 200) )
        return;
    this[dir] = new_pos;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dir) {
  var amount = 0;
  if(dir === 'left') {
    dir = 'x';
    amount = -101;
  }
  if(dir === 'right') {
    dir = 'x';
    amount = 101;
  }
  if(dir === 'up') {
    dir = 'y';
    // inital jump
    if ( this.y === (canvas.height - 175) )
      amount = -55;
    else
      amount = -83;
  }
  if(dir === 'down') {
    dir = 'y';
    amount = 83;
  }

  this.update(dir,amount);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [],
    player = new Player();

Enemy.addEnemies = function() {
  var i = 1;
  while(i < 5) {
    allEnemies.push(new Enemy(Math.random() * canvas.width, (i * 83) + 55 ));
    ++i;
  }
};

Enemy.addEnemies();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
