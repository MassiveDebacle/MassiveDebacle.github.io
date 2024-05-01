let w = 1280
let h = 720

let maps
let attacking
let player
let back
let hud
let gameState = "playing"
let game_round = 1
let lastRoundTime = 0
let enemies = []

let bossSpawnInterval = 60000
let lastBossSpawnTime = 0

let lastEnemySpawnTime = 0
let enemySpawnInterval = 10000

function preload() {

    loadfront = loadImage("cave_front.png")
    loadmiddle = loadImage("cave_middle.png")
    load_map_back = loadImage("cave_back.png")
    back = loadImage("back.png")
    loadexclamation = loadImage("exclamation.png")
    loadstory = loadImage("story_enter.png")
    loadinfinite = loadImage("infinite_enter.png")
    loadtut = loadImage("return_tutorial.png")

    // gob
    gob_I = loadImage("GoblinIdle.png")
    loadgob_attack = loadImage("gob_attack.gif")
    loadgob_run = loadImage("gob_run.gif")

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

    // hud 0H... MP
    loadhud_defeat = loadImage("defeat_screen.png")
}

function setup() {
    createCanvas(w,h)
    collideDebug(true)
    player = user = new user()
    maps = work = new work()
    ground = block = new block()
    int = interaction = new interaction()
    hud = heads_up_display = new heads_up_display()
    wave = rounds = new rounds()
    enemy = new Enemy()
    // boss = new Boss

    spawnEnemies(3)
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
        rect(this.x, this.y, 30, 75)

       
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
            this.x -= 5;
        } else if (direction === "right") {
            this.x += 5;
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
        rect(w/230,h/1.14,1400, 1000)
    }

    this.hit = function() {    
        let groundObjects = [
            { x: w/230, y: h/1.14, width: 1400, height: 1000 },
        ]
        
        for (let obj of groundObjects) {
            let playerLeft = player.x;
            let playerRight = player.x + 30; // Width of player's collision box
            let playerTop = player.y;
            let playerBottom = player.y + 75; // Height of player's collision box

            let groundLeft = obj.x;
            let groundRight = obj.x + obj.width;
            let groundTop = obj.y;
            let groundBottom = obj.y + obj.height;

            if (playerRight > groundLeft && playerLeft < groundRight && playerBottom > groundTop && playerTop < groundBottom) {
                console.log("hit")
            }
            if (player.y + 75 > obj.y) {
                player.y = obj.y - 75
                player.velocity = 0
        }
            }
        }   
    }

function work(){
    this.back = function() {
        image(back, 0,0,w,h)
    }
    this.cave_front = function() {
        image(loadfront, 0,0,w,h)
    }
    this.cave_middle = function() {
        image(loadmiddle, 0,0,w,h)
    }
    this.cave_back = function () {
        image(load_map_back, 0,0,w,h)
    }
}

function interaction() {
    this.x = w/2
    this.y = h/2

}

function heads_up_display() {
        this.x = w/2
        this.y = h/2
    this.health_mp = function() {
        noFill()
        stroke(255, 0)
        rect(w/13, h/7, 175, 95)  

        // if player 100H... MP
        if (player.hp >= 100 && player.mp >= 100) {
            image(loadhud_100H_100MP, 10, 10, 550, 550)
        } else if (player.hp >= 100 && player.mp >= 75) {
            image(loadhud_100H_75MP, 10, 10, 550, 550)
        } else if (player.hp >= 100 && player.mp >= 65) {
            image(loadhud_100H_65MP, 10, 10, 550, 550)
        } else if (player.hp >= 100 && player.mp >= 45) {
            image(loadhud_100H_45MP, 10, 10, 550, 550)
        } else if (player.hp >= 100 && player.mp >= 25) {
            image(loadhud_100H_25MP, 10, 10, 550, 550)
        } else if (player.hp >= 100 && player.mp >= 0) {
            image(loadhud_100H_0MP, 10, 10, 550, 550)
        }

        // Display HUD for 75H...mp
        else if (player.hp >= 75 && player.mp >= 100) {
            image(loadhud_100H_100MP, 10, 10, 550, 550)
        } else if (player.hp >= 75 && player.mp >= 75) {
            image(loadhud_75H_75MP, 10, 10, 550, 550);
        } else if (player.hp >= 75 && player.mp >= 65) {
            image(loadhud_75H_65MP, 10, 10, 550, 550);
        } else if (player.hp >= 75 && player.mp >= 45) {
            image(loadhud_75H_45MP, 10, 10, 550, 550);
        } else if (player.hp >= 75 && player.mp >= 25) {
            image(loadhud_75H_25MP, 10, 10, 550, 550);
        } else if (player.hp >= 75 && player.mp >= 0) {
            image(loadhud_75H_0MP, 10, 10, 550, 550);
        }

        // Display HUD for 50H...mp
        else if (player.hp >= 50 && player.mp >= 100) {
            image(loadhud_50H_100MP, 10, 10, 550, 550)
        } else if (player.hp >= 50 && player.mp >= 75) {
            image(loadhud_50H_75MP, 10, 10, 550, 550)
        } else if (player.hp >= 50 && player.mp >= 65) {
            image(loadhud_50H_65MP, 10, 10, 550, 550)
        } else if (player.hp >= 50 && player.mp >= 45) {
            image(loadhud_50H_45MP, 10, 10, 550, 550)
        } else if (player.hp >= 50 && player.mp >= 25) {
            image(loadhud_50H_25MP, 10, 10, 550, 550)
        } else if (player.hp >= 50 && player.mp >= 0) {
            image(loadhud_50H_0MP, 10, 10, 550, 550)
        }

        // Display HUD for 25H...mp
        else if (player.hp >= 25 && player.mp >= 100) {
            image(loadhud_25H_100MP, 10, 10, 550, 550)
        } else if (player.hp >= 25 && player.mp >= 75) {
            image(loadhud_25H_75MP, 10, 10, 550, 550)
        } else if (player.hp >= 25 && player.mp >= 65) {
            image(loadhud_25H_65MP, 10, 10, 550, 550)
        } else if (player.hp >= 25 && player.mp >= 45) {
            image(loadhud_25H_45MP, 10, 10, 550, 550)
        } else if (player.hp >= 25 && player.mp >= 25) {
            image(loadhud_25H_25MP, 10, 10, 550, 550)
        } else if (player.hp >= 25 && player.mp >= 0) {
            image(loadhud_25H_0MP, 10, 10, 550, 550)
        }
        // hp0
        else if (player.hp <= 25 && player.mp >= 100) {
            image(loadhud_25H_100MP, 10, 10, 550, 550)
        } else if (player.hp <= 25 && player.mp >= 75) {
            image(loadhud_25H_75MP, 10, 10, 550, 550)
        } else if (player.hp <= 25 && player.mp >= 65) {
            image(loadhud_25H_65MP, 10, 10, 550, 550)
        } else if (player.hp <= 25 && player.mp >= 45) {
            image(loadhud_25H_45MP, 10, 10, 550, 550)
        } else if (player.hp <= 25 && player.mp >= 25) {
            image(loadhud_25H_25MP, 10, 10, 550, 550)
        } else if (player.hp <= 25 && player.mp >= 0) {
            image(loadhud_25H_0MP, 10, 10, 550, 550)
        }
        else {
        }
    }
    this.defeat = function() {
        if (player.hp <= 0){
            fill('rgba(0, 0, 0, 0.65)')
          rect(0, 0, w, h)
          image(loadhud_defeat, 140, -40, 1000, 1000)
          noLoop()
        }
      }
}

function Enemy() {
    this.x = random(w)
    this.y = h / 3;
    this.speed = 2;
    this.width = 30;
    this.height = 75;
    this.exp = 2;
  
    this.hp = 50;
    this.atk = 1.0;
  
    this.gravity = 1.0;
    this.velocity = 0;
  
    this.alive = true;
    let enemy_attacking = false;
    this.AI = function() {
        if (!this.alive) {
            return
        }

        // hit box 
        noFill()
        stroke(255, 0)
        rect(this.x + 30, this.y - 20, 75, 95)
        
        if (enemy_attacking) {
            image(loadgob_attack, this.x - 140, this.y - 170, 530, 500)
        } else {
            image(loadgob_run, this.x + 20, this.y - 20, 110, 120)
        }

        if (attacking) {
            if (collideRectRect(this.x +10, this.y - 20, 75, 95, player.x + 5, player.y - 10, 75, 85)) {
                this.hp -= player.atk
            }
        }
        
        if (this.hp <= 0) {
            this.alive = false;
            this.atk = 0;
        
            player.exp += this.exp;
        }
    };

    this.enemy_attack = function(){
        noFill()
        stroke(255, 0)
        rect(this.x + 10, this.y - 20, 120, 95)
        if (collideRectRect(this.x + 10, this.y - 20, 120, 95, player.x, player.y, 30, 75)) {
            enemy_attacking = true
            noFill()
            stroke(255, 0)
            rect(this.x + 30, this.y - 20, 75, 75)
            if (collideRectRect(this.x + 30, this.y - 20, 75, 75, player.x, player.y, 30, 75)) {
                if (this.alive) {
                    player.hp -= this.atk
                }
            }
        } else {
            enemy_attacking = false
        }
    }

    this.update = function() {
        if (!this.alive) {
            return;
        }
        if (player.x < this.x) {
            this.x -= this.speed;
        } else if (player.x > this.x) {
            this.x += this.speed;
        }
        this.velocity += this.gravity;
        this.y += this.velocity;
        this.velocity *= 0.9;

        // Collision Detection
        let enemyLeft = this.x;
        let enemyRight = this.x + this.width;
        let enemyTop = this.y;
        let enemyBottom = this.y + this.height;
    
        let groundObjects = [
            { x: w/230, y: h/1.14, width: 1400, height: 1000 },
        ];
        for (let obj of groundObjects) {
            let groundLeft = obj.x;
            let groundRight = obj.x + obj.width;
            let groundTop = obj.y;
            let groundBottom = obj.y + obj.height;
    
            if (
                enemyRight > groundLeft &&
                enemyLeft < groundRight &&
                enemyBottom > groundTop &&
                enemyTop < groundBottom
            ) {
                if (enemyTop < groundBottom) {
                    this.y = groundTop - this.height;
                    this.velocity = 0;
                }
            }
        }
    }
    setInterval(function() {
        enemy.enemy_attack();
    }, 800);
}

function updateAndRenderEnemies() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        let enemy = enemies[i];
        enemy.update();
        enemy.AI();
        enemy.enemy_attack();
        if (!enemy.alive) {
            if (random(100) <= 10) {
                addHPtoPlayer()
            }
            enemies.splice(i, 1)
        }
    }
}

function spawnEnemies(count) {
    let additionalEnemy = game_round > 3 ? 1 : 0; // Check if additional enemy should spawn
    for (let i = 0; i < count + additionalEnemy; i++) {
        enemies.push(new Enemy());
    }
}

function addHPtoPlayer() {
    player.hp += 25;
}

function rounds() {
    this.spawn = function() {
            enemy.update();
            enemy.AI();
        }
    }

function draw() {
    maps.back();
    maps.cave_back();
    ground.brick();
    ground.hit(); 
    maps.cave_middle();
    player.show();
    player.update();
    player.interaction();
    player.attacking_box();
    maps.cave_front();
    hud.health_mp();
    wave.spawn();
    updateAndRenderEnemies();

    // Check if all enemies are dead
    if (enemies.length === 0) {
        if (millis() - lastEnemySpawnTime > enemySpawnInterval) {
            spawnEnemies(3+game_round)
            lastEnemySpawnTime = millis()
            game_round+=1
        }
    }

    // Display elapsed time
    elapsedTime = millis() / 1000;
    let minutes = floor(elapsedTime / 60);
    let seconds = floor(elapsedTime % 60);

    fill(255);
    rect(w/2.4, 10, 200, 40);
    fill(0);
    textSize(16);
    text("Time Played: " + nf(minutes, 2) + ":" + nf(seconds, 2), w/2.3, 30);

    text((player.hp), w/8.2, h/6);
    console.log(player.level);

    hud.defeat();
    }
