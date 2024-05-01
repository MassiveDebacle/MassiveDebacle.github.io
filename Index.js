let w = 1280
let h = 720

let opening 
let loadplay
let loadtitle
let back
let music

function preload() {
    loadplay = loadImage("press_space.png")
    loadmap = loadImage("start_map.png")
    loadtitle = loadImage("title_thing.png")
    back = loadImage("back.png")
    music = loadSound("begin_music.mp3")
}

function setup() {
    createCanvas(w,h)
    opening = op = new op
}

function op() {
    this.x = w
    this.y = h
    this.yy = h/30
    this.start = function(){
        image(loadplay, this.x/2.7, this.y/1.8, 350,350)
        if (keyIsDown(32)) {
            location.href="GameProjectRevamp.html"
        }
    }
    this.title = function(){
        image(loadtitle, this.x/4.4, this.yy/20, 750,750)
    }
    this.background = function(){
        image(loadmap,0,0,w,h)
    }
    this.back = function(){
        image(back, 0,0,w,h)
    }
}

function draw() {
    opening.back()
    opening.background()
    opening.start()
    opening.title()
    music.setVolume(0.3)
    music.play()
}