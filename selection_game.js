let w = 1280
let h = 720

let maps
let attacking
let player 
let back
let music


function preload() {
    music = loadSound("mhm.mp3")

    loadfront = loadImage("selection_front.png")
    loadmiddle = loadImage("selection_middle.png")
    load_map_back = loadImage("selection_map_back.png")
    back = loadImage("back.png")
    loadexclamation = loadImage("exclamation.png")
    loadstory = loadImage("story_enter.png")
    loadinfinite = loadImage("infinite_enter.png")
    loadtut = loadImage("return_tutorial.png")

    // mc
    charcter_I = loadImage("characterIDLE.png")
    charcter_AttackGIF = loadImage("characterAttack.gif")
    LoadCharacter_RunR = loadImage("characterRunR.gif")
    LoadCharacter_RunL = loadImage("characterRunL.gif")
    LoadCharacter_JumpR = loadImage("characterJumpR.gif")
    LoadCharacter_JumpL = loadImage("characterJumpL.gif")

    // hud 100H... MP
    loadhud_100H_100MP = loadImage("hud_100H_100MP.png")
    loadhud_100H_75MP = loadImage("hud_100H_75MP.png")
    loadhud_100H_65MP = loadImage("hud_100H_65MP.png")
    loadhud_100H_45MP = loadImage("hud_100H_45MP.png")
    loadhud_100H_25MP = loadImage("hud_100H_25MP.png")
    loadhud_100H_0MP = loadImage("hud_100H_0MP.png")

    // hud 75H... MP
    loadhud_75H_100MP = loadImage("hud_75H_100MP.png")
    loadhud_75H_75MP = loadImage("hud_75H_75MP.png")
    loadhud_75H_65MP = loadImage("hud_75H_65MP.png")
    loadhud_75H_45MP = loadImage("hud_75H_45MP.png")
    loadhud_75H_25MP = loadImage("hud_75H_25MP.png")
    loadhud_75H_0MP = loadImage("hud_75H_0MP.png")

    // hud 50H...MP
    loadhud_50H_100MP = loadImage("hud_50H_100MP.png")
    loadhud_50H_75MP = loadImage("hud_50H_75MP.png")
    loadhud_50H_65MP = loadImage("hud_50H_65MP.png")
    loadhud_50H_45MP = loadImage("hud_50H_45MP.png")
    loadhud_50H_25MP = loadImage("hud_50H_25MP.png")
    loadhud_50H_0MP = loadImage("hud_50H_0MP.png")

    // hud 25H... MP
    loadhud_25H_100MP = loadImage("hud_25H_100MP.png")
    loadhud_25H_75MP = loadImage("hud_25H_75MP.png")
    loadhud_25H_65MP = loadImage("hud_25H_65MP.png")
    loadhud_25H_45MP = loadImage("hud_25H_45MP.png")
    loadhud_25H_25MP = loadImage("hud_25H_25MP.png")
    loadhud_25H_0MP = loadImage("hud_25H_0MP.png")
}

function setup() {
    createCanvas(w,h)
    collideDebug(true)
    player = user = new user()
    maps = work = new work()
    ground = block = new block()
    int = interaction = new interaction()
}

function keyPressed() {
    if (keyCode === 83) { // "s" key
        if (!dashCooldown) { // Check if dash is not on cooldown
            if (key === 'ArrowLeft') {
                player.dash("left");
            } else if (key === 'ArrowRight') {
                player.dash("right");
            }
        }
    }
}

function user() {
    this.x = w/16
    this.y = h/1.5
    this.gravity = 1.0
    this.lift = -20 
    this.velocity = 0 

    this.hp = 100
    this.atk = 3
    this.def = 10
    this.mp = 100
    this.level = 1 
    this.exp = 0 

    this.show = function() {
        noFill()
        stroke(255, 0)
        rect(this.x, this.y-10, 30, 75)

       
        if (attacking) {
            image(charcter_AttackGIF, this.x - 35, this.y - 50, w /9, h / 5, 0, 0, 0, 0, 100);
        } else if (keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && !keyIsDown(UP_ARROW)) {
            this.gravity = 1.0;
            this.x -= 4;
            image(LoadCharacter_RunL, this.x - 28, this.y - 45, w / 11, h / 5, 0, 0, 0, 0, 100);
        } else if (keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW) && !keyIsDown(UP_ARROW)) {
            this.gravity = 1.0;
            this.x += 4;
            image(LoadCharacter_RunR, this.x - 40, this.y - 45, w / 11, h / 5, 0, 0, 0, 0, 100);
        } else if (keyIsDown(UP_ARROW)) {
            this.y -= 32;
            this.gravity = 1.0;
            this.velocity += this.gravity;
            this.y += this.velocity;
            if (keyIsDown(LEFT_ARROW)) {
                this.x -= 4;
                image(LoadCharacter_JumpL, this.x - 35, this.y - 50, w / 14, h / 6, 0, 0, 0, 0, 100);
            } else if (keyIsDown(RIGHT_ARROW)) {
                this.x += 4;
                image(LoadCharacter_JumpR, this.x - 35, this.y - 50, w / 14, h / 6, 0, 0, 0, 0, 100);
            } else {
                image(LoadCharacter_JumpR, this.x - 35, this.y - 50, w / 14, h / 6, 0, 0, 0, 0, 100);
            }
        } else if (keyIsDown(90)) {
            attacking = true;
            image(charcter_AttackGIF, this.x - 35, this.y - 50, w /9, h / 5, 0, 0, 0, 0, 100);
        } else {
            image(charcter_I, this.x - 28, this.y - 45, w / 12, h / 5, 0, 0, 0, 0, 100);
        }
        
    this.dash = function(direction) {
        if (direction === "left") {
            this.x -= 3
        } else if (direction === "right") {
            this.x += 3
        }
        // Start cooldown timer
        dashCooldown = true;
        lastDashTime = millis();
    }

    this.interaction = function() {
        // interaction box
        noFill()
        stroke(255, 0)
        rect(this.x-8, this.y-10, 75, 75)
    }

    this.attacking_box = function(){
        if(attacking){
            console.log("attack")
            noFill()
            stroke(255, 0)
            rect(this.x+5, this.y-10, 75, 85)
        }
    }

    this.update = function() {
        this.velocity += this.gravity
        this.y += this.velocity 
        this.velocity *= 0.9

        if (this.exp >= 10) {
            this.level += 1
            this.exp = 0
        }

        if (keyIsDown(83)) { 
            if (keyIsDown(LEFT_ARROW)) {
                this.dash("left");
            } else if (keyIsDown(RIGHT_ARROW)) {
                this.dash("right");
            }
        }
        }
        

    if (this.y > height - 55) {
        this.y = height - 55;
        this.velocity = 0;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x > width - 30) { 
        this.x = width - 30;
    }
    if (attacking) {
        setTimeout(() => {
            attacking = false
        }, 100)
    }
}
    this.level_attacks = function() {
        if (this.level >= 2) {
            if (keyIsDown(88)) { // "x" key
                fill("red");
                rect(this.x + 50, this.y, 75, 75)
                }
                
            }
        }
    this.regen = function(){
        this.hp += 2
    }
    setInterval(function() {
        if(player.hp <= 100) {
            player.regen() 
        }
        else{
        }
    },6000)
}

function block() {    
    this.brick = function (){
        fill("red")
        rect(w/230,h/1.33,1400, 1000)
    }

    this.signs = function() {

        image(loadinfinite, w/1.5, h/1.8, 165, 165)

        image(loadtut, w/22, h/1.8, 165, 165)
    }

    this.hit = function() {    
        let groundObjects = [
            { x: w/230, y: h/1.35, width: 1400, height: 1000 },
        ]
        
        for (let obj of groundObjects) {
            let playerLeft = player.x;
            let playerRight = player.x + 30; // Width of player's collision box
            let playerTop = player.y;
            let playerBottom = player.y + 55; // Height of player's collision box

            let groundLeft = obj.x;
            let groundRight = obj.x + obj.width;
            let groundTop = obj.y;
            let groundBottom = obj.y + obj.height;

            if (playerRight > groundLeft && playerLeft < groundRight && playerBottom > groundTop && playerTop < groundBottom) {
                console.log("hit");
                // Adjust player's position to prevent going through the ground
                if (player.y + 55 > obj.y) {
                    player.y = obj.y - 55;
                    player.velocity = 0; // Stop player's vertical movement
                }
            }
        }   
    }
}

function work(){
    this.back = function() {
        image(back, 0,0,w,h)
    }
    this.selection_front = function() {
        image(loadfront, 0,0,w,h)
    }
    this.selection_middle = function() {
        image(loadmiddle, 0,0,w,h)
    }
    this.selection_back_map = function () {
        image(load_map_back, 0,0,w,h)
    }
}

function interaction() {
    this.x = w/2
    this.y = h/2

    this.tutorial = function() {
        noFill()
        stroke(255, 0)
        rect(this.x-610, this.y+75, 75, 75)
        if ( collideRectRect(this.x-610, this.y+75, 75, 75, player.x-8, player.y-10, 75, 75) === true) {
            console.log("INTERACT")
            image(loadexclamation,this.x-700, this.y-30, 200, 200 )
            if (keyIsDown(65)) {
                location.href="GameProjectRevamp.html"
            }
        }
    }
    this.cave = function() {
        noFill()
        stroke(255, 0)
        rect(this.x+460, this.y+75, 175, 75)
        if ( collideRectRect(this.x+460, this.y+75, 175, 75, player.x-8, player.y-10, 75, 75) === true) {
            console.log("INTERACT")
            image(loadexclamation,this.x+370, this.y-30, 200, 200 )
            if (keyIsDown(65)) {
                location.href="cave_game.html"
            }
    }}
}

music.setVolume(0.10)

function draw() {
    maps.back()
    music.play()
    maps.selection_back_map()
    ground.brick()
    ground.hit() 
    maps.selection_middle()
    ground.signs()
    player.show()
    player.update()
    player.interaction()
    player.attacking_box()
    maps.selection_front()
    int.tutorial()
    int.cave()
}