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

let tile_X_calculation = Math.floor(canvas.width/tile_size)-2
// let tile_X_remainder = (canvas.width%tile_size)
// let tile_X_new_remainder = canvas.width/tile_X_remainder
// let tile_X_displace_ammount = (tile_X_new_remainder/2)
// let final_X_tile_displace = tile_X_displace_ammount/tile_X_calculation

let tile_Y_calculation = Math.floor(canvas.height/tile_size)-1
// let tile_Y_remainder = (canvas.height%tile_size)*10
// let tile_Y_displace_ammount = tile_Y_remainder/2
// let final_Y_tile_displace = tile_Y_displace_ammount/tile_X_calculation

let tiles = []

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
        tiles.push(this)
    }
    draw() {
        let based = 2
        for (let i = 1; i < 5; i++) {
            for (let j = 0; j < tiles.length; j++) {
                ctx.beginPath()
                ctx.strokeStyle = "rgb(200,10,10)"
                ctx.fillStyle = "rgb(250,250,150)"
                ctx.lineWidth = 2
                ctx.moveTo(tiles[j].dic[i].x,tiles[j].dic[i].y)
                ctx.lineTo(tiles[j].dic[based].x,tiles[j].dic[based].y)
                ctx.stroke()
            //  ctx.fillText(`${based}`,tiles[j].dic[i].x+tiles[j].RX,tiles[j].dic[i].y-tiles[j].RY)
        }
        if (based >= 4){
            based = 0
        }
        based++
    }
    }

}

let centers = []

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
        new Tile(x*tile_size*1,(y*tile_size+tile_size)*1)
   }
}

function mainLoop(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    // this is just drawing 
    world.forEach(item => {
        item.draw()
    });
    tiles.forEach(tile =>{
        tile.draw()
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