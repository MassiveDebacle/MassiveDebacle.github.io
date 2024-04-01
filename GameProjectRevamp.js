let w = 1280
let h = 720
let hit 
let player 
let p1g
let m1
let back 
let camera
let perspective 

// polys 

let p1

// sprites 

let gob_I
let EyeB_I

let charcter_I

// gif

let charcter_AttackGIF

function preload() {
    m1 = loadImage("ezMap.png")
    gob_I = loadImage("GoblinIdle.png")
    EyeB_I = loadImage("EyeB.png")
    back = loadImage("back.png")
    tree = loadImage("tree_back.png")
    charcter_I = loadImage("characterIDLE.png")
    charcter_AttackGIF = loadImage("characterAttack.gif")

    LoadCharacter_RunR = loadImage("characterRunR.gif")
    LoadCharacter_RunL = loadImage("characterRunL.gif")
    LoadCharacter_JumpR = loadImage("characterJumpR.gif")
    LoadCharacter_JumpL = loadImage("characterJumpL.gif")

}

function setup() {
    createCanvas(w,h, )
    collideDebug(true)
    // createCanvas(w,h,WEBGL)
    // camera = createCamera()
    player = user = new user()
    p1g = ground_1 = new ground_1()
    maps = tiled = new tiled()
}

function user() {
    this.x = w/15
    this.y = h/2
    this.gravity = 0.5
    this.lift = -20 
    this.velocity = 0 
    this.jumpcount = 0
    this.jumpMax = 2

    this.show = function() {
        noFill();
        stroke(255, 0);
        rect(this.x, this.y, 30, 55);
    
        if (keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && !keyIsDown(UP_ARROW)) {
            this.gravity = 0.7;
            this.x -= 4;
            image(LoadCharacter_RunL, this.x - 28, this.y - 45, w / 11, h / 5, 0, 0, 0, 0, 100);
        } 
        else if (keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW) && !keyIsDown(UP_ARROW)) {
            this.gravity = 0.7;
            this.x += 4;
            image(LoadCharacter_RunR, this.x - 40, this.y - 45, w / 11, h / 5, 0, 0, 0, 0, 100);
        } 
        else if (keyIsDown(UP_ARROW)) {
            this.y -= 18
            this.gravity = 0.7
            this.velocity += this.gravity
            this.y += this.velocity
            if (keyIsDown(LEFT_ARROW)) {
                this.x -= 4
                image(LoadCharacter_JumpL, this.x - 35, this.y - 50, w / 14, h / 6, 0, 0, 0, 0, 100)
            } 
            else if (keyIsDown(RIGHT_ARROW)) {
                this.x += 4
                image(LoadCharacter_JumpR, this.x - 35, this.y - 50, w / 14, h / 6, 0, 0, 0, 0, 100)
            } 
            else {
                image(LoadCharacter_JumpR, this.x - 35, this.y - 50, w / 14, h / 6, 0, 0, 0, 0, 100)
            }
        }
        else {
            image(charcter_I, this.x - 28, this.y - 45, w / 12, h / 5, 0, 0, 0, 0, 100);
        }
    }

    this.update = function() {
        this.velocity += this.gravity
        this.y += this.velocity 
        this.velocity *= 0.9

        // Check boundaries
    if (this.y > height - 55) { // Prevent from going below the canvas bottom
        this.y = height - 55;
        this.velocity = 0;
    }
    if (this.x < 0) { // Prevent from going beyond left canvas edge
        this.x = 0;
    }
    if (this.x > width - 30) { // Prevent from going beyond right canvas edge
        this.x = width - 30;
    }
}
}

function ground_1() {
    this.show = function() {
    noFill()
    stroke(255, 0)
    rect(w/70-350,h/1.4,w/2,h/2)

    noFill()
    stroke(255, 0)
    rect(w/5, h/1.22, w/4, h/2)

    noFill()
    stroke(255, 0)
    rect(w/3, h/1.16, w/2, h/2)

    noFill()
    stroke(255, 0)
    rect(w/1.57, h/1.3, w/4, h/1.8)

    noFill()
    stroke(255, 0)
    rect(w/1.405, h/1.65, w/4, h/2)

    noFill()
    stroke(255, 0)
    rect(w/1.36, h/1.8, w/4, h/2)

    noFill()
    stroke(255, 0)
    rect(w/1.23, h/2, w/4, h/2)

    noFill()
    stroke(255, 0)
    rect(w/1.184, h/2.4, w/4, h/2)

    noFill()
    stroke(255, 0)
    rect(w/1.12, h/3.2, w/2, h/2)

    } 

    this.hit = function() {    
    // Check for collisions with each ground_1 object
    let groundObjects = [
        { x: w/70-350, y: h/1.4, width: w/2, height: h/2 }, // green
        { x: w/5, y: h/1.22, width: w/4, height: h/2 }, // purple
        { x: w/3, y: h/1.16, width: w/2, height: h/2 }, // red
        { x: w/1.57, y: h/1.3, width: w/4, height: h/1.8 }, // blue
        { x: w/1.405, y: h/1.65, width: w/4, height: h/2 }, // pink
        { x: w/1.36, y: h/1.8, width: w/4, height: h/2 }, // violet
        { x: w/1.23, y: h/2, width: w/4, height: h/2 }, // magenta
        { x: w/1.184, y: h/2.4, width: w/4, height: h/2 }, // maroon
        { x: w/1.12, y: h/3.2, width: w/4, height: h/2 }, // green
    ]
    
    for (let obj of groundObjects) {
        // Check for collisions with each side of the ground object
        let topCollision = collideRectRect(obj.x, obj.y, obj.width, 5, player.x, player.y, 36, 75)
        let bottomCollision = collideRectRect(obj.x, obj.y + obj.height - 5, obj.width, 5, player.x, player.y, 36, 75)
        let leftCollision = collideRectRect(obj.x, obj.y, 5, obj.height, player.x, player.y, 36, 75)
        let rightCollision = collideRectRect(obj.x + obj.width - 5, obj.y, 5, obj.height, player.x, player.y, 36, 75)

        // If there's a collision with any side, stop the player from moving in that direction
        if (topCollision || bottomCollision || leftCollision || rightCollision) {
            console.log("hit")
            player.velocity = 0
            player.lift = 0
            player.gravity = 0

            if (leftCollision) {
                player.x = obj.x - 36
            }
            if (rightCollision) {
                player.x = obj.x + obj.width - 3
            }
        }
    }   

    }  
}

function tiled(){
    this.back = function() {
        image(back, 0,0,w,h)
    }

    this.tree = function() {
        image(tree, 0,0,w)
    }

    this.map1 = function() {
        image(m1, 0, 0,w,h)
    }
}

function draw() {
    maps.back()
    maps.tree()
    p1g.show()
    player.show()
    p1g.hit()
    player.update()
    maps.map1()
}