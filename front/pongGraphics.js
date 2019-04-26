import * as graphic from './graphic';
import { Pong } from '../shared/pong';
import { player } from './game';

/**
 * Draw pong on canvas
 * @param {Pong} pong 
 */
export function drawPong(pong) {
    for(const brick of pong.bricks) {
        if(player.side == 'left' && brick.x < 50) graphic.fillStyle('red');
        else if(player.side == 'right' && brick.x > 50) graphic.fillStyle('red');
        else graphic.fillStyle('white');
        
        graphic.rectPercent(brick.x, brick.y, brick.width, brick.height);
    }

    for(const ball of pong.balls) {
        graphic.fillStyle('white');
        graphic.rectPercent(ball.x, ball.y, ball.width, ball.height);
    }
}