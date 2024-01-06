let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

let tile_size = 100, mouseX = 0, mouseY = 0

let world = []

let trees = {
    1:{oak: []},
    2:{Sbirch: []},
    3:{sycamore: []},
    4:{Hchestnut: []}
}

// holy moly that was simpler than I thought it would be, turns out you should times the X calc by the tile size not 10 
let halfCanvasW = canvas.width/2
let tile_X_calculation = 3//Math.floor(canvas.width/tile_size)-2
let left_X_ajustment = halfCanvasW-tile_X_calculation/2*tile_size

let halfCanvasH = canvas.height/2
let tile_Y_calculation = 3//Math.floor(canvas.width/tile_size)-2
let left_Y_ajustment = halfCanvasH-tile_X_calculation/2*tile_size

let tiles = []


// bit of a mess but basically generates a 4 sided tile based of x and y coordinates 
class Tile{
    constructor(centerX,centerY){
        this.centerX = centerX
        this.centerY = centerY
        this.dic = {
            1:{x:this.centerX+tile_size,y:this.centerY-tile_size},
            2:{x:this.centerX,y:this.centerY-tile_size},
            3:{x:this.centerX,y:this.centerY},
            4:{x:this.centerX+tile_size,y:this.centerY},
        }
        this.RX = randnum(3)
        this.RY = randnum(3)
        this.num = null
        tiles.push(this)
    }
    // might find a better way to draw the tiles to the screen. At the moment we a calling 3^3 loops,
    // might need to migrate this back to the draw loop outside the tile.
    draw() {
        let based = 2
        this.num = tiles.indexOf(this)
        for (let i = 1; i < 5; i++) {
            for (let j = 0; j < tiles.length; j++) {
                ctx.beginPath()
                ctx.strokeStyle = "rgb(200,10,10)"
                ctx.fillStyle = "rgb(250,250,150)"
                ctx.lineWidth = 2
                ctx.moveTo(tiles[j].dic[i].x,tiles[j].dic[i].y)
                ctx.lineTo(tiles[j].dic[based].x,tiles[j].dic[based].y)
                ctx.stroke()
                // ctx.fillText(`${this.num}`,tiles[j].dic[i].x+tiles[j].RX,tiles[j].dic[i].y-tiles[j].RY)
            }
        if (based >= 4){
            based = 0
        }
        based++
    }
    }

}

let centers = []

// creates a small 1x1 pixel for seeds that will come later
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

for (let y = 0; y < tile_Y_calculation; y++) {
   for (let x = 0; x < tile_X_calculation; x++) {
        new Tile((x*tile_size)+left_X_ajustment,(y*tile_size+tile_size)+left_Y_ajustment)
   }
}

function mainLoop(){
    ctx.clearRect(0,0,canvas.width,canvas.height)

    // this draws the seeds in the world
    world.forEach(item => {
        item.draw()
    });
    
    // this is just brain damage, calling a foreach loop wich feeds into two more for loops
    tiles.forEach(tile =>{
        tile.draw()
        ctx.fillText(`${tile.num}`,tile.centerX+tile_size/2,tile.centerY-tile_size/2)
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

canvas.addEventListener("mousemove", event =>{
    mouseX = event.clientX
    mouseY = event.clientY
    new seed(randnum(canvas.width), randnum(canvas.height))
})

window.addEventListener("resize", event =>{
    canvas.width = innerWidth
    canvas.height = innerHeight
})

requestAnimationFrame(mainLoop)