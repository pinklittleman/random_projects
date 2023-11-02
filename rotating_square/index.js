let canvas = document.querySelector("canvas")
let ctx    = canvas.getContext("2d")

canvas.width  = innerWidth
canvas.height = innerHeight

let Items = []

class Square{
    constructor(){
        this.x = x
        this.y = y
        this.size = 10
        Items.push(this)
    }
    draw(){
        ctx.beginPath
    }
}


function mainloop(){
    

    Items.forEach(item => {
        item.draw()
    });

    requestAnimationFrame(mainloop)
}

requestAnimationFrame(mainloop)