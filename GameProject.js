var canvas = document.querySelector("canvas");

let w = window.innerWidth
let h = window.innerHeight

let pX = w/23
let pY = h/9

let spriteW = w/20
let spriteH = h/12

let starter_map 
let ant 

let player 
let map_1 

function preload() {
    starter_map = loadImage("map.png")
    ant = loadImage("BlackAnt.png")
}

function setup() {
    createCanvas(w,h)
    player = creature = new creature()
    map_1 = ground = new ground()
}

function creature() {
    this.show = function() {
        circle(30, 30, 20)
        image(ant, pX, pY, spriteW, spriteH)
    }
    this.left = function() {
        if(keyIsDown(LEFT_ARROW)) {
            pX -= 2
        }
    }
    this.down = function() {
        if(keyIsDown(DOWN_ARROW)) {
            pY += 2
        }
    }
}

function ground() {
    this.show = function() {
      fill('green')
    rect(-1,-1, 230,250)  
    }
}

function draw() {
    map_1.show()
    image(starter_map, -1, -1, w, h)
    player.show()
    player.left()
    player.down()
}