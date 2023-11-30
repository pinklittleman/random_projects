let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight


function mainLoop(){

   
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