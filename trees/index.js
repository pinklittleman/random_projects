let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

let tile_size = 120, mouseX = 0, mouseY = 0, activeTile = null, mouseDownX = 0, mousedownY = 0,
 tiles = [], world = [], active_Tile_Num, clicked_tile, middleOffsetW, middleOffsetH, oldLeftAjust

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

oldLeftAjust = left_X_ajustment


// bit of a mess but basically generates a 4 sided tile based off x and y coordinates 
class Tile{
    constructor(startX,startY, Xnum, Ynum){
        this.startX = startX
        this.startY = startY
        this.Xnum = Xnum
        this.Ynum = Ynum
        this.cords = null
        this.active = true
        this.num = this.Xnum+this.Ynum
        this.maxSeeds = randnum(15)
        this.seeds = []
        this.middleX = startX+tile_size/2
        this.middleY = startY-tile_size/2
        this.distanceW = null
        this.distanceH = null
        this.hypot = null
        this.enlarged = false
        this.changing = false
        tiles.push(this)
    }
    draw() {
        this.middleX = this.startX+tile_size/2
        this.middleY = this.startY-tile_size/2
        this.startX = (this.Xnum*tile_size)+left_X_ajustment
        this.startY = (this.Ynum*tile_size+tile_size)+left_Y_ajustment
        this.cords = [this.startX+tile_size,this.startY-tile_size,this.startX,this.startY-tile_size,this.startX,this.startY,this.startX+tile_size,this.startY]
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
        ctx.fillStyle = "rgb(200,200,20)"
        ctx.fillText(`${this.changing}`, this.middleX,this.middleY)
        if(this.enlarged){
            middleOffsetW = halfCanvasW - this.middleX 
            middleOffsetH = halfCanvasH - this.middleY
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
        new Tile((x*tile_size)+left_X_ajustment,(y*tile_size+tile_size)+left_Y_ajustment, x,y)
   }
}

function mainLoop(){
    active_Tile_Num = tiles.indexOf(activeTile)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.moveTo(canvas.width/2,0)
    ctx.lineTo(canvas.width/2,canvas.height)
    ctx.stroke()

    // this draws the seeds in the world
    // world.forEach(item => {
    //     item.draw()
    //     setTimeout(() => {
    //         item.age++
    //     }, 1000*randnum(200));
    // });

    tiles.forEach(tile =>{
        tile.draw()
        // ctx.fillText(`${tile.num}`,tile.startX+tile_size/2,tile.startY-tile_size/2)
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
    tiles.forEach(tile => {
        tile.hypot = Math.round(Math.hypot(tile.distanceH**2, tile.distanceW**2))
    });
})

canvas.addEventListener("mousedown", event =>{
    tiles.forEach(tile => {
        if(Math.sqrt(tile.hypot) < tile_size/2){
            activeTile = tile
        }
    });

    if (activeTile != null) {
        if(tiles[active_Tile_Num].changing == false){
            if(tiles[active_Tile_Num].enlarged){
                decreaseTile()
            }
            else{
                increaseTile()
            }
        }
    }
})

function increaseTile(){
    if(tiles[active_Tile_Num].changing){
        return 0
    }
    if(tile_size >= 290){
        return
    }
    let sizeInc = setInterval(() => {
        tiles[active_Tile_Num].changing = true
        tile_size++
        left_X_ajustment+=0.2
        if (tile_size >= 290) {
            clearInterval(sizeInc)
            tiles.forEach(tile => {
                tile.changing = false
                if(activeTile != tile){
                    tile.active = false
                }
            });
        
            left_X_ajustment += middleOffsetW
            
        }
    }, 290/60);
    // need to make devisable by screen refresh rate not hard coded 
    tiles[active_Tile_Num].enlarged = true
}

function decreaseTile(){
    if(tiles[active_Tile_Num].changing){
        return
    }
    if(tile_size <= 120){
        return
    }
    let sizeDec = setInterval(() => {
        tiles[active_Tile_Num].changing = true
        tile_size--
        left_X_ajustment-=0.2
        left_Y_ajustment-=0.2
        if (tile_size <= 120) {
            clearInterval(sizeDec)
            tiles.forEach(tile => {
                tile.changing = false
                if(activeTile != tile){
                    tile.active = true
                }
            });
            left_X_ajustment = oldLeftAjust
        }
    }, 290/60);
    tiles[active_Tile_Num].enlarged = false
}

window.addEventListener("resize", event => {
    canvas.width = innerWidth
    canvas.height = innerHeight
})

requestAnimationFrame(mainLoop)