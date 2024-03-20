let canvas = document.querySelector("canvas")
let ctx    = canvas.getContext("2d")

canvas.width  = innerWidth
canvas.height = innerHeight

let Items = [], dlt = 0.009, maxItems = 400, colours = ["rgb(42, 72, 88)","rgb(255, 134, 20)","rgb(255, 7, 84)","rgb(236, 78, 126)","rgb(195, 81, 154)","rgb(143, 88, 161)","rgb(92, 89, 149)","rgb(54, 83, 121)"]

class Square{
    constructor(x,y,startingAngle){
        this.x = x
        this.y = y
        this.length = 40
        this.angle = startingAngle
        this.centerX = this.x + this.length / 2
        this.centerY = this.y + this.length / 2
        this.colour = colours[randnum(colours.length)]
        Items.push(this)
    }
    draw(){
        // ctx.fillText(`${this.angle}`,this.centerX-5,this.centerY+this.length+10)
        ctx.fillStyle = this.colour
        ctx.strokeStyle = this.colour
        ctx.beginPath();
        let p1 = this.rotatePoint(this.x, this.y, this.centerX, this.centerY, this.angle);
        let p2 = this.rotatePoint(this.x + this.length, this.y, this.centerX, this.centerY, this.angle);
        let p3 = this.rotatePoint(this.x + this.length, this.y + this.length, this.centerX, this.centerY, this.angle);
        let p4 = this.rotatePoint(this.x, this.y + this.length, this.centerX, this.centerY, this.angle);
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.closePath(); // Close the square path
        ctx.lineWidth = 10;
        ctx.stroke();
        this.angle += dlt;
        if (this.angle >= 360){ this.angle -= 360};
    }
    rotatePoint(x, y, centerX, centerY, angle) {
        let radians = angle * Math.PI / 180;
        let cos = Math.cos(radians);
        let sin = Math.sin(radians);
        let nx = (cos * (x - centerX)) + (sin * (y - centerY)) + centerX;
        let ny = (cos * (y - centerY)) - (sin * (x - centerX)) + centerY;
        return { x: nx, y: ny };
    }
}

class Triangle {
    constructor(x, y, startingAngle) {
        this.x = x;
        this.y = y;
        this.length = 40;
        this.angle = startingAngle;
        this.centerX = this.x + this.length / 2;
        this.centerY = this.y + (Math.sqrt(3) / 2) * this.length; // Adjusted for equilateral triangle
        this.colour = colours[randnum(colours.length)]; // Assuming colours and randnum are defined elsewhere
        Items.push(this); // Assuming Items array is defined elsewhere
    }

    draw() {
        ctx.fillStyle = this.colour;
        ctx.strokeStyle = this.colour;
        ctx.beginPath();
        let p1 = this.rotatePoint(this.x, this.y + this.length, this.centerX, this.centerY, this.angle); // Bottom-left corner
        let p2 = this.rotatePoint(this.x + this.length / 2, this.y, this.centerX, this.centerY, this.angle); // Top corner
        let p3 = this.rotatePoint(this.x + this.length, this.y + this.length, this.centerX, this.centerY, this.angle); // Bottom-right corner
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();
        ctx.lineWidth = 10;
        ctx.stroke();
        this.angle += dlt;
        if (this.angle >= 360) {
            this.angle -= 360;
        }
    }

    rotatePoint(x, y, centerX, centerY, angle) {
        let radians = angle * Math.PI / 180;
        let cos = Math.cos(radians);
        let sin = Math.sin(radians);
        let nx = (cos * (x - centerX)) + (sin * (y - centerY)) + centerX;
        let ny = (cos * (y - centerY)) - (sin * (x - centerX)) + centerY;
        return { x: nx, y: ny };
    }
}

function randnum(num){
    let ran = Math.floor(Math.random()*num)
    if (ran == 0){
        ran++
    }
    return ran
}

setInterval(() => {
    if(Items.length < maxItems){
        new Square(randnum(canvas.width),randnum(canvas.height),randnum(360))
        new Triangle(randnum(canvas.width),randnum(canvas.height),randnum(360))
    }
}, 100);
setInterval(() => {
    Items.splice(1,1)
}, 3000);


function mainloop(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    Items.forEach(item => {
        item.draw()
    });

    requestAnimationFrame(mainloop)
}

requestAnimationFrame(mainloop)