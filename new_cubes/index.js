let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

let squareSize = 100, mouseX = 0, mouseY = 0

let trees = {
    oak: [],
    Sbirch: [],
    sycamore: [],
    Hchestnut: []
}

let num = 0


let startX = canvas.width/2
let startY = canvas.height/2
let tiles = [
    {
        1:{x:startX-squareSize,y:startY-squareSize},
        2:{x:startX,y:startY-squareSize},
        3:{x:startX,y:startY},
        4:{x:startX-squareSize,y:startY},
    },
    {
        1:{x:startX+squareSize,y:startY+squareSize},
        2:{x:startX,y:startY+squareSize},
        3:{x:startX,y:startY},
        4:{x:startX+squareSize,y:startY},
    },
    {
        1:{x:startX-squareSize,y:startY+squareSize},
        2:{x:startX,y:startY+squareSize},
        3:{x:startX,y:startY},
        4:{x:startX-squareSize,y:startY},
    },
    {
        1:{x:startX+squareSize,y:startY-squareSize},
        2:{x:startX,y:startY-squareSize},
        3:{x:startX,y:startY},
        4:{x:startX+squareSize,y:startY},
    },
]

let center = []

//  just witchcraft. Next automate this ^^^^^^
let based = 2
for (let i = 1; i < tiles.length+1; i++) {
    for (let j = 0; j < tiles.length; j++) {
        ctx.beginPath()
        ctx.strokeStyle = "rgb(200,10,10)"
        ctx.lineWidth = 2
        ctx.moveTo(tiles[j][i].x,tiles[j][i].y)
        ctx.lineTo(tiles[j][based].x,tiles[j][based].y)
        ctx.stroke()
    }
    if (based >= tiles.length){
        based = 0
    }
    based++
}

// for (let i = 10; i < canvas.height; i+=squareSize) {
//     ctx.beginPath()
//     Ys.push(i)
//     for (let j = 0; j < canvas.width; j+=squareSize) {
//         ctx.fillStyle = "rgb(200,10,200)"
//         ctx.strokeStyle = "rgb(200,10,10)"
//         ctx.fillText(`${num}`,j,i)
//         ctx.fillRect(j,i,1,1)
//         ctx.moveTo(j,i)
//         ctx.lineTo(j,i)
//         // ctx.stroke()
//         num++
//         Xs.push(j)
//     }
//     ctx.stroke()
// }

let world = []

class seed{
    constructor(x,y){
        this.tree_type = null
        this.age = 0
        this.x = x
        this.y = y
        world.push(this)
    }
    draw(){
        ctx.fillStyle = "rgb(10,200,20)"
        ctx.fillRect(this.x,this.y,2,2)
    }
    agecheck(){
        if(this.age === 10){

        }
    }
}

setInterval(() => {
    for (let i = 0; i < 10; i++) {
        new seed(randnum(canvas.width), randnum(canvas.height))
    }
}, 100);

function mainLoop(){
    // ctx.clearRect(0,0,canvas.width,canvas.height)
    world.forEach(item => {
        item.draw()
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

canvas.addEventListener("mousemove", event =>{
    mouseX = event.clientX
    mouseY = event.clientY
    new seed(randnum(canvas.width), randnum(canvas.height))
})

requestAnimationFrame(mainLoop)