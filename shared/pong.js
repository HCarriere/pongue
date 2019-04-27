// Written in ModuleJS

/**
 * Shared by front & back code
 */
class Pong {

    constructor() {

        /** @type {Brick[]} */
        this.bricks = [
            new Brick(10, 50),
            new Brick(90, 50),
        ];

        /** @type {Ball[]} */
        this.balls = [
            new Ball(50, 50, {x:2, y:Math.random()*2 - 1}),
            // new Ball(50, 50, {x:-1, y:Math.random() - 0.5}),
        ];

        /** @type {Number} */
        this.currentFrame = 0;
    }
    
    /**
     * Process a pong frame
     * Multiply distance with a deltaTime
     * @param {Number} deltaTime 
     */
    processFrame(deltaTime = 1) {
        /*for(const brick of this.bricks) {
            brick.move(deltaTime);
        }*/

        // ball physic
        for(const ball of this.balls) {
            let collidingBrick = ball.collideWithBricks(this.bricks);
            if(collidingBrick || ball.collideWithXWalls()) {
                ball.velocity.x = -ball.velocity.x;
            }
            if(ball.collideWithYWalls()) {
                ball.velocity.y = -ball.velocity.y;
            }
            ball.move(deltaTime);

        }

        this.currentFrame+=deltaTime;
    }

    /**
     * Process only some user inputs
     * @param {Object} data 
     */
    processEvent(data) {
        for(let brick of this.bricks) {
            if(brick.x < 50) {
                // left
                let sum = 0;
                for(let c of data.left) {
                    if(c == 'u') sum-=1;
                    if(c == 'd') sum+=1;
                }
                brick.y += sum;
            } else {
                // right
                let sum = 0;
                for(let c of data.right) {
                    if(c == 'u') sum-=1;
                    if(c == 'd') sum+=1;
                }
                brick.y += sum;
            }
        }
    }

    /**
     * Synchronise the whole pong game state
     * @param {Object} data 
     * @returns {Number} number of frame you must skip because you are in advance
     */
    synchronize(data) {
        if(data.frame >= this.currentFrame) {
            // late, catch up
            this.bricks = [];
            for(let brick of data.bricks) {
                this.bricks.push(new Brick(brick.x, brick.y));
            }

            this.balls = [];
            for(let ball of data.balls) {
                this.balls.push(new Ball(ball.x, ball.y, ball.velocity));
            }
            this.currentFrame = data.frame;
        }
        // in advance, skip next frames
        return this.currentFrame - data.frame;
    }

    /**
     * Returns the whole game state
     * @returns {Object} 
     */
    getSynchronisation() {
        return {
            bricks: this.bricks,
            balls: this.balls,
            frame: this.currentFrame,
        }
    }
}

class Brick {

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = 2;
        this.height = 10;
    }

    move(deltaTime) {

    }

    requestMove() {

    }

    /**
     * 
     * @param {Ball} ball 
     */
    isColliding(ball) {
        if(ball.x < this.x + this.width && ball.x > this.x - this.width &&
            ball.y < this.y + this.height && ball.y > this.y) {
            return true;
        }
        return false;
    }
}

class Ball {
    
    constructor(x, y, velocity) {
        this.x = x;
        this.y = y;
        this.width = 1;
        this.height = 2;
        this.velocity = velocity;
    }

    move(deltaTime) {
        this.x += this.velocity.x * deltaTime;
        this.y += this.velocity.y * deltaTime;
    }

    /**
     * return a brick if its collide with it
     * @param {Bricks[]} bricks 
     * @return {?Brick}
     */
    collideWithBricks(bricks) {
        for(const brick of bricks) {
            if(brick.isColliding(this)) {
                return brick;
            }
        }
        return null;
    }

    /**
     * Returns true if it collide with a LEFT or RIGHT wall
     * @returns {Boolean}
     */
    collideWithXWalls() {
        return this.x <= 0 || this.x >= 100;
    }

    /**
     * Returns true if it collide with a UP or DOWN wall
     * @returns {Boolean}
     */
    collideWithYWalls() {
        return this.y <= 0 || this.y >= 100;
    }
}

module.exports = {
    Pong,
}