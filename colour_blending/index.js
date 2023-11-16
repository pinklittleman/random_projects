let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

let points = [], gen = 1, spot = 10

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

for (let i = 0; i < 600; i++) {
    new Point(randnum(canvas.width), 10, 1)
}


function mainLoop(){
    // ctx.clearRect(0,0, canvas.width, canvas.height)

    points.forEach(point => {
        point.draw()
        generate()
    });

    requestAnimationFrame(mainLoop)
}

function randnum(num){
    let ran = Math.floor(Math.random()*num)
    if (ran == 0){
        ran++
    }
    return ran
}

function generate(){
    if (gen*10 >= canvas.height-5) {
        // new Point(randnum(canvas.width), 10, 1)
        return
    }
    let ogGen = gen
    gen++
    points.forEach(point => {
        if(point.generation >= ogGen){
            new Point(point.x+randnum(10), gen*10, gen)
        }
    });
}

requestAnimationFrame(mainLoop)