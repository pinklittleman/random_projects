let canvas = document.querySelector("canvas")
let ctx    = canvas.getContext("2d")

canvas.width  = innerWidth
canvas.height = innerHeight

let Items = []


function randnum(num){
    let ran = Math.floor(Math.random()*num)
    if (ran == 0){
        ran++
    }
    return ran
}



function mainloop(){
    ctx.clearRect(0,0,canvas.width,canvas.height)

    requestAnimationFrame(mainloop)
}

requestAnimationFrame(mainloop)