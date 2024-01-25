let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

let tile_size = 120, mouseX = 0, mouseY = 0, activeTile = null, mouseDownX = 0, mousedownY = 0, tiles = [], world = []

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



// bit of a mess but basically generates a 4 sided tile based of x and y coordinates 
class Tile{
    constructor(centerX,centerY){
        this.centerX = centerX
        this.centerY = centerY
        // this.dic = {
        //     1:{},
        //     2:{},
        //     3:{},
        //     4:{},
        // }
        this.cords = null
        this.active = true
        this.num = null
        this.maxSeeds = randnum(5)
        this.seeds = []
        this.middleX = centerX+tile_size/2
        this.middleY = centerY-tile_size/2
        this.distanceW = null
        this.distanceH = null
        this.hypot = null
        tiles.push(this)
    }
    // might find a better way to draw the tiles to the screen. At the moment we a calling 3^3 loops,
    // might need to migrate this back to the draw loop outside the tile.
    draw() {
        this.cords = [this.centerX+tile_size,this.centerY-tile_size,this.centerX,this.centerY-tile_size,this.centerX,this.centerY,this.centerX+tile_size,this.centerY]
        this.num = tiles.indexOf(this)
        if(this.active){
            ctx.beginPath()
            ctx.strokeStyle = "rgb(200,10,10)"
            ctx.lineWidth = 2
            ctx.moveTo(this.cords[0],this.cords[1])
            ctx.lineTo(this.cords[2],this.cords[3])
            ctx.moveTo(this.cords[2],this.cords[3])
            ctx.lineTo(this.cords[4],this.cords[5])
            ctx.moveTo(this.cords[4],this.cords[5])
            ctx.lineTo(this.cords[6],this.cords[7])
            ctx.moveTo(this.cords[6],this.cords[7])
            ctx.lineTo(this.cords[7],this.cords[8])
            ctx.moveTo(this.cords[7],this.cords[8])
            ctx.lineTo(this.cords[0],this.cords[1])
            ctx.stroke()
        }
        this.distanceW = this.middleX - mouseX
        this.distanceH = this.middleY - mouseY
        this.hypot = Math.round(Math.hypot(this.distanceH**2, this.distanceW**2))
            if(Math.sqrt(this.hypot) < tile_size/2){
                ctx.fillStyle = "rgba(220,20,20,0.1)"
                ctx.fillRect(this.middleX-tile_size/2,this.middleY-tile_size/2,tile_size,tile_size)
                ctx.fillStyle = "rgba(255,255,255,0.8)"
                activeTile = this
        }

    }

}

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
        setTimeout(() => {
            item.age++
        }, 1000*randnum(200));
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

canvas.addEventListener("mousemove", event => {
    mouseX = event.clientX
    mouseY = event.clientY
    if(activeTile != null){
        if(activeTile.seeds.length <= activeTile.maxSeeds){
            // activeTile.seeds.push(new seed(activeTile.middleX-tile_size/2+randnum(tile_size), activeTile.middleY-tile_size/2+randnum(tile_size)))
        }
    }
})

canvas.addEventListener("mousedown", event =>{
    if (activeTile != null) {
        let tile_num = tiles.indexOf(activeTile)
        if (tiles[tile_num].active) {
            tiles[tile_num].active = false
            
        }
        else{
            tiles[tile_num].active = true
        }
    }

})

function increaseTile(){
    tile_size++
}

window.addEventListener("resize", event => {
    canvas.width = innerWidth
    canvas.height = innerHeight
})

requestAnimationFrame(mainLoop)