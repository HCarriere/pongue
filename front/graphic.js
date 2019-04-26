import { Context } from './game';
/** @type {Number} */
const MOD = 1;
/** @type {string[]} */
let images = [];

/**
 * Set the fill color
 * @param {string} color ex: #FF00FF
 */
export function fillStyle(color) {
    Context.ctx.fillStyle = color;
}

/**
 * Set the stroke color
 * @param {string} color ex : #00FF00 
 */
export function strokeStyle(color) {
    Context.ctx.strokeStyle = color;
}

/**
 * Fill a rectangle
 * @param {number} x 
 * @param {number} y 
 * @param {number} wid 
 * @param {number} hei 
 */
export function rect(x, y, wid, hei) {
    Context.ctx.fillRect(x*MOD | 0, y*MOD | 0, wid*MOD | 0, hei*MOD | 0);
}

/**
 * Fill a rectangle with percent values
 * @param {number} x 
 * @param {number} y 
 * @param {number} wid 
 * @param {number} hei 
 */
export function rectPercent(x, y, wid, hei) {
    Context.ctx.fillRect(
        (x*MOD*Context.width)/100 | 0, 
        (y*MOD*Context.height)/100 | 0, 
        (wid*MOD*Context.width)/100 | 0, 
        (hei*MOD*Context.height)/100 | 0);
}

/**
 * Draw the lines of a rectangle
 * @param {number} x 
 * @param {number} y 
 * @param {number} wid 
 * @param {number} hei 
 */
export function strokeRect(x, y, wid, hei) {
    Context.ctx.strokeRect(x*MOD | 0, y*MOD | 0, wid*MOD | 0, hei*MOD | 0);
}

/**
 * Fill & stroke a circle
 * @param {number} x 
 * @param {number} y 
 * @param {number} radius 
 */
export function circle(x, y, radius) {
    Context.ctx.arc(x*MOD | 0, y*MOD | 0, radius | 0, 0, Math.TWO_PI);
    Context.ctx.fill();
    Context.ctx.stroke();
}

/**
 * Draw a line
 * @param {number} x 
 * @param {number} y 
 * @param {number} x2 
 * @param {number} y2 
 */
export function stroke(x, y, x2, y2) {
    Context.ctx.beginPath();
    Context.ctx.moveTo(x*MOD | 0, y*MOD | 0);
    Context.ctx.lineTo(x2*MOD | 0, y2*MOD | 0);
    Context.ctx.stroke();
    Context.ctx.moveTo(0, 0);
}

/**
 * Draw a whole image from memory
 * @param {*} imageIndice indice from [images]
 * @param {*} x 
 * @param {*} y 
 */
export function image(imageIndice, x, y) {
    Context.ctx.drawImage(imageIndice, x*MOD | 0, y*MOD | 0);
}

/**
 * fetch an image and put it in store
 * @param {string} url 
 * @param {callback} callback 
 */
export function loadImage(url, callback) {
    let img = new Image();
    img.onload = () => {
        callback(images.push(this));
    }
    img.src = url;
}

export function clearImageStore() {
    images = [];
}


export function text(str, x, y) {
    Context.ctx.fillText(str, x*MOD | 0, y*MOD | 0)
}


export function textStyle(str) {
    Context.ctx.font = str;
}


export function textAlign(vertical, horizontal) {
    Context.ctx.textAlign = vertical;
    Context.ctx.textBaseline = horizontal;
}


export function setBackground(image) {
    
}

export function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}