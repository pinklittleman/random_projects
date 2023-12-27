let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

let points = []

class Point{
    constructor(x,y,generation){
        this.x = x
        this.y = y
        this.generation = generation
        points.push(this)
    }

    draw(){
        ctx.fillStyle = "rgb(200,20,20)"
        ctx.fillRect(this.x, this.y, 5, 5)
    }
}


function mainLoop(){
    // ctx.clearRect(0,0, canvas.width, canvas.height)

    points.forEach(point => {
        point.draw()
    })
    
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