let canvas = document.querySelector("canvas")
let ctx    = canvas.getContext("2d")
canvas.width  = innerWidth
canvas.height = innerHeight

let players = []

class square{
    constructor(x,y,h,w){
        this.x = x
        this.y = y
        this.oh = h
        this.ow = w
        this.h = h+y
        this.w = w+x
        this.centerP = {x:(this.ow/2)+this.x,y:(this.oh/2)+this.y}
        this.collision = false
        this.id = null
        this.playersDist = []
        players.push(this)
    }
    draw(){
        ctx.fillStyle = "white"
        ctx.strokeStyle = "red"
        if (this.collision) {
            ctx.strokeStyle = "blue"
        }
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.w, this.y);
        ctx.lineTo(this.w, this.h);
        ctx.lineTo(this.x, this.h);
        ctx.lineTo(this.x, this.y);
        ctx.closePath(); // Close the square path
        ctx.lineWidth = 10;
        ctx.stroke();
    }
    collisioncheck(){
        this.centerP = {x:(this.ow/2)+this.x,y:(this.oh/2)+this.y}
        let a,b,h
        players.forEach(p => {
            if(p == this){
                this.id = players.indexOf(this)
            }
            else{
                // a = this.centerP.y-p.centerP.y
                // b = this.centerP.x-p.centerP.x
                // if (Math.sign(a) > 0 && !undefined){
                //     na = a
                // }
                // if (Math.sign(b) > 0 && !undefined){
                //     nb = b
                // }
                // console.log(nb)
                // // let check2 = Math.sign(b) > 0 ? b = b : ` is negative`;
                // // console.log(check2)
                // if(this.centerP.x > p.centerP.x || this.centerP.y > p.centerP.y){
                //     a = this.centerP.x-p.centerP.x
                //     b = this.centerP.y-p.centerP.y
                // }
                // else{
                //     a = p.centerP.x-this.centerP.x
                //     b = p.centerP.y-this.centerP.y
                // }
                h = Math.hypot(this.centerP.x-p.centerP.x,this.centerP.y-p.centerP.y)
                // console.log(`a: ${a} b: ${b}`)
                // console.log(h)
                if(this.playersDist.length > players.length-2){
                    this.playersDist = []
                }
                this.playersDist.push({id:players.indexOf(p), hypot:h})

            }
        });
    }
}



function loopmain(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    
    players.forEach(p => {
        p.draw()
        p.collisioncheck()
    });
    requestAnimationFrame(loopmain)   
}
let player1 = new square(10,10,10,10)
let player2 = new square(100,100,10,10)
let player3 = new square(200,100,10,10)

canvas.addEventListener('mousemove',(e)=>{
    // console.log(e.clientX)
    player1.x = e.clientX
    player1.y = e.clientY
    player1.h = player1.y+player1.oh
    player1.w = player1.x+player1.ow
})

requestAnimationFrame(loopmain)