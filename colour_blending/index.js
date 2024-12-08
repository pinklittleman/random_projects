let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight


class Drop{
    constructor(x,y,r){
        this.x = x
        this.y = y
        this.r = r
        this.vertices = []
    }
    draw(){
        ctx.beginPath()
        ctx.closePath()
    }
}

function mainLoop(){
    // ctx.clearRect(0,0, canvas.width, canvas.height)
    new Drop(100,100,50)

    requestAnimationFrame(mainLoop)
}

function randnum(num){
    let ran = Math.floor(Math.random()*num)
    if (ran == 0){
        ran++
    }
    return ran
}

requestAnimationFrame(mainLoop)