let bola, anclaje, spring;
let gravity;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    bola = new Particle(window.innerWidth / 2, window.innerHeight / 2, false);
    anclaje = new Particle(window.innerWidth / 2, window.innerHeight / 2 + 100, true);
    spring = new Spring(0.01, 200, bola, anclaje);
    gravity = createVector(0, 0.1);
}

function draw(){
    background(64, 166, 250);
    spring.go();
    bola.go();
    anclaje.go();

    if(mouseIsPressed){
        bola.position.set(mouseX, mouseY);
        bola.velocity.set(0,0);
    }
}

function windowResize(){
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function Spring(k, brazo, a , b){
    this.k = k;
    this.brazo = brazo;
    this.a = a;
    this.b = b;

    this.update = function(){
        let force = p5.Vector.sub(this.b.position, this.a.position);
        let x = force.mag() - this.brazo;
        force.normalize();
        force.mult(this.k * x);
        this.a.applyForce(force);
        force.mult(-1);
        this.b.applyForce(force);
    };

    this.show = function(){
        strokeWeight(4);
        stroke(255);
        line(
            this.a.position.x,
            this.a.position.y,
            this.b.position.x,
            this.b.position.y
        );
    };

    this.go = function(){
        this.update();
        this.show();
    };
}

function Particle(x, y, estatico) {
    this.acceleration = createVector(0,0);
    this.velocity = createVector(0,0);
    this.position = createVector(x,y);
    this.mass = 1;
    this.estatico = estatico;


    this.applyForce = function(force){
        let f = force.copy();
        f.div(this.mass);
        this.acceleration.add(f);
    };

    this.update = function(){
        if(this.estatico){ return; }
        this.velocity.mult(0.99);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    };

    this.show = function(){
        stroke(255);
        strokeWeight(2);
        fill(255);
        if(this.estatico){ 
            ellipse(this.position.x, this.position.y, 64)
        } else {
            ellipse(this.position.x, this.position.y, 32);
        }
    };

    this.go = function(){
        this.update();
        this.show();
    };
}
