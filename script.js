const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");

// Makes sure the canvas covers the whole window height and width so drawings don't get distorted when window is resized
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// But these two lines ^^ only run once! Event listener below v covers cases where user resizes browser window
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


// Also need to put the code that draws the shape in this event listener block as well or else the shape will only be drawn once.
// It will disappear if the window is resized otherwise.
//     context.fillStyle = "white";
//     context.fillRect(10, 10, 150, 50);
});

const particlesArr = [];
let hue = 0;

const mouse = {
    x: undefined,
    y: undefined,
}
canvas.addEventListener("click", function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 10; i++) {
        particlesArr.push(new Particle);
    }
});

canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 5; i++) {
        particlesArr.push(new Particle);
    }
})

class Particle { // Creates randomly generated particles
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 3 - 1.5; // Random num between + 1.5 and -1.5
        this.speedY = Math.random() * 3 - 1.5;
        this.color = "hsl(" + hue + ", 100%, 50%)";
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
    context.fillStyle = this.color;
    context.border
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
    }
}


function handleParticles() {
    for (let i = 0; i < particlesArr.length; i++) {
        particlesArr[i].update();
        particlesArr[i].draw();

        for (let j = i; j < particlesArr.length; j++) { 
            // Pythagorean formula
            const dx = particlesArr[i].x - particlesArr[j].x;
            const dy = particlesArr[i].y - particlesArr[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                context.beginPath();
                context.strokeStyle = particlesArr[i].color;
                context.lineWidth = 0.1;
                context.moveTo(particlesArr[i].x, particlesArr[i].y);
                context.lineTo(particlesArr[j].x, particlesArr[j].y);
                context.stroke();
            }
        }
        if (particlesArr[i].size <= 0.3) {
            particlesArr.splice(i, 1); // If particles is less than or equal to 0.3 it will delete THAT particle (particle wth index i) and no other particles in the array (hence the 1 afterwards)
            i--;
        }
    }
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgba(0,0,0,0.01)";
    context.fillRect(0,0, canvas.width, canvas.height);
    handleParticles();
    hue += 2;
    requestAnimationFrame(animate);
}
animate();