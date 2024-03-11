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

function preload() {
    m1 = loadImage("ezMap.png")
    gob_I = loadImage("GoblinIdle.png")
    EyeB_I = loadImage("EyeB.png")
    back = loadImage("back.png")

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
        // where we determine what it looks like 
        fill("white")
        rectMode(this.x, this.y, 30, 55)
        // scale(1.2)
        image(EyeB_I, this.x-70,this.y-70, w/8, h/4, 0,0,0,0, 100)

        // translate(0-this.x,0-this.y)
        // scale(2,2)
        }
    this.update = function() {
        this.velocity += this.gravity
        this.y += this.velocity 
        this.velocity *= 0.9
        this.jumpcount = 0
    }

    this.move = function() {

        if (keyIsDown(LEFT_ARROW)) {
            this.gravity = 0.7
            this.velocity *= 0.9
            this.x -= 4
            this.y += 0 
        }

        if (keyIsDown(RIGHT_ARROW)) {
            this.gravity = 0.7
            this.velocity *= 0.9
            this.x += 4
        }
    }

    this.jump = function() {
        
        if (keyIsDown(UP_ARROW)) {
            this.y -= 12
            this.x -= 0 
            this.gravity = 0.7
            this.velocity += this.gravity
            this.y += this.velocity 
            this.velocity *= 0.9
            this.jumpcount + 1
        }
        }
    }


function ground_1() {
    this.show = function() {
    fill('green')
    rect(w/70-350,h/1.4,w/2,h/2)

    fill('purple')
    rect(w/5, h/1.22, w/4, h/2)

    fill('red')
    rect(w/3, h/1.16, w/2, h/2)

    fill('blue')
    rect(w/1.6, h/2, w/4, h/2)

    fill('green')
    rect(w/1.184, h/3.2, w/2, h/2)

    } 

    this.hit = function() {
        let hit = false
        if (hit = collideRectRect(w/70-350,h/1.4,w/2,h/2, player.x, player.y, 30, 55)) {
            console.log("hit")
            player.velocity *= 0
            player.lift = 0
            player.gravity = 0
        }

        if (hit = collideRectRect(w/5, h/1.22, w/4, h/2, player.x, player.y, 30, 55)) {
            console.log("hit")
            player.velocity *= 0
            player.lift = 0
            player.gravity = 0
        }

            if (hit = collideRectRect(w/3, h/1.16, w/2, h/2, player.x, player.y, 30, 55)) {
                console.log("hit")
                player.velocity *= 0
                player.lift = 0
                player.gravity = 0

        if (hit = collideRectRect(w/1.6, h/2, w/4, h/2, player.x, player.y, 30, 55)) {
            console.log("hit")
            player.velocity *= 0
            player.lift = 0
            player.gravity = 0
        }
        
        }
        if (hit = collideRectRect(w/1.184, h/3.2, w/2, h/2, player.x, player.y, 30, 55)) {
            console.log("hit")
            player.velocity *= 0
            player.lift = 0
            player.gravity = 0
        }
    }  
}

function tiled(){
    this.back = function() {
        image(back, 0,0,w,h)
    }

    this.map1 = function() {
        image(m1, 0, 0,w,h)
    }
}

function draw() {
    clear()
    p1g.show()
    p1g.hit()
    // maps.back()
    player.show()
    player.update()
    player.jump()
    player.move()
    maps.map1()
}