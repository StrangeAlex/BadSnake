let snk;
let food;
let w;
let foodCounter;

function setup() {
  frameRate(13);
  createCanvas(800, 800);
  w = width / 20;
  snk = new Snake();
  food = new FoodClass();
  food.pickLocation();
}

function draw() {
  background("#CEAC79");
  snk.show();
  snk.crawl();
  snk.teleport();
  food.display();
  snk.collision();
  if (snk.isFoodPicked(food)) {
    food.pickLocation();
  }
}

function Snake() {
  this.tail = [];
  this.foodCounter = 0;
  this.speedX = 0;
  this.speedY = 0;
  this.x = 0;
  this.y = 0;
  this.s = width / 20;
  this.show = function() {
    fill("#42f46e");
    rect(this.x, this.y, this.s, this.s);
    for (let v = 0; v < this.tail.length; v++) {
      fill("#46C8B4");
      rect(this.tail[v].x, this.tail[v].y, this.s, this.s);
    }
  };
  this.crawl = function() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    this.tail[this.foodCounter - 1] = {
      x: this.x,
      y: this.y,
    }
    this.x += this.speedX * this.s;
    this.y += this.speedY * this.s;
  };
  this.isFoodPicked = function(other) {
    if (this.x === other.foodX && this.y === other.foodY) {
      this.foodCounter += 1;
      console.log(this.tail.length);
      return true;
    }
    return false;
  };
  this.direction = function(dirX, dirY) {
    this.speedX = dirX;
    this.speedY = dirY;
  }
  this.teleport = function() {
    if (this.x >= width) {
      this.x = 0;
    }
    if (this.y >= height) {
      this.y = 0;
    }
    if (this.x < 0) {
      this.x = width;
    }
    if (this.y < 0) {
      this.y = height;
    }
  }
  this.collision = function() {
    for (let i = 0; i < this.tail.length; i++) {
      if (this.x === this.tail[i].x && this.y === this.tail[i].y && this.y) {
        textSize(40);
        this.speedX = 0;
        this.speedY = 0;
        text("Game, is.. umm, kinda over.", 100, 200);
      }
    }
  }
}

function FoodClass() {
  let rows = width / w;
  let cols = width / w;
  this.foodX = 0;
  this.foodY = 0;

  this.pickLocation = function() {
    this.foodX = w * int(random(cols));
    this.foodY = w * int(random(rows));
  };

  this.display = function() {
    this.size = width / 20;
    fill("#f44271");
    rect(this.foodX, this.foodY, this.size, this.size);
  };
}

function keyPressed() {
  if (keyCode === UP_ARROW && snk.speedY != 1) {
    snk.direction(0, -1);
  }
  if (keyCode === DOWN_ARROW && snk.speedY != -1) {
    snk.direction(0, 1);
  }
  if (keyCode === LEFT_ARROW && snk.speedX != 1) {
    snk.direction(-1, 0);
  }
  if (keyCode === RIGHT_ARROW && snk.speedX != -1) {
    snk.direction(1, 0);
  }
}