import {Vector} from "../shared/Vector";

export class Ball {
    position: Vector;
    velocity: Vector;
    radius: number = 20;

    constructor(posX: number, posY: number) {
        this.position = new Vector(posX, posY);
        this.velocity = this.generateParallelVelocity().multiply(0.2);
    }

    generateRandomVelocity() {
        const randomX =
            (
                Math.floor(Math.random() * 120) +
                100
            ) * (Math.random() < 0.5 ? -1 : 1);
        const randomY =
            (
                Math.floor(Math.random() * 150) +
                100
            ) * (Math.random() < 0.5 ? -1 : 1);

        return new Vector(randomX, randomY);
    }

    generateParallelVelocity() {
        const randomX =
            (
                Math.floor(Math.random() * 120) +
                100
            ) * (Math.random() < 0.5 ? -1 : 1);
        const randomY = randomX *  (Math.random() < 0.5 ? -1 : 1);

        return new Vector(randomX, randomY);
    }


    changeRadius(radius: number) {
        this.radius = radius;
    }

    move() {
        if (typeof window === "undefined") {
            return;
        }

        const newPosition = this.position.add(this.velocity);
        const smoothness = 0.05;
        this.position = this.position
            .add(newPosition.subtract(this.position).multiply(smoothness));

        // If the ball is out of the screen, generate a new velocity vector with reverse direction
        if (this.position.x < 0 || this.position.x > window.innerWidth) {
            this.velocity = new Vector(this.velocity.x * -1, this.velocity.y);
        }

        if (this.position.y < 0 || this.position.y > window.innerHeight) {
            this.velocity = new Vector(this.velocity.x, this.velocity.y * -1);
        }

    }
}