import * as graphic from './graphic';
import { Pong } from '../shared/pong';
import { drawPong } from './pongGraphics';

/** 
 * Calculation per seconds targeted from server
 * @type {Number} 
 */
const CPS_TARGET = 10;

/**
 * All of canvas properties
 */
export let Context = {
    ctx:null,
    canvas:null,
    width:null,
    height:null,
    frameCount:null,
    fps:null,
    deltaTime:null,
}
export let player;

/** @type {Pong} */
let pong;

const maxJournalLength = 20;

let framesToSkip;

/** @type {Socket} */
let socket;
let lastAnimationTime;
let journalEntries = [];
let inputCache = [];

let loopStopped = true;

function init() {

    pong = new Pong();

    initInputNetworkEventLoop();

    journal('initialisation done');
    loopStopped = false;
}

function loop() {
    // clear screen
    Context.ctx.clearRect(0, 0, Context.canvas.width, Context.canvas.height);
    
    if(!loopStopped) {
        if(framesToSkip > 0) {
            framesToSkip--;
        } else {
            pong.processFrame(Context.deltaTime);
        }
        drawPong(pong);
    }
    showDebug();
    
    // get fps & delta time
    Context.fps = getFPS();
    Context.deltaTime = CPS_TARGET / Context.fps;
    Context.frameCount++;
    // execute next iteration
    requestAnimationFrame(loop);
}


function initCanvas() {
    // init canvases
    Context.canvas = document.getElementById('game');
    Context.ctx = Context.canvas.getContext('2d');
    Context.frameCount = 0;

    // windows events
    window.onresize = resizeCanvas;
    window.onkeydown = event => onKeyDown(event);
    window.onkeyup = event => onKeyUp(event);
    Context.canvas.addEventListener('contextmenu', event => event.preventDefault());

    // canvas size
    Context.width = Context.canvas.width = (window.innerWidth) - 100;
    Context.height = Context.canvas.height = (window.innerHeight) - 100;
    resizeCanvas();
}

function resizeCanvas() {
    Context.width = Context.canvas.width = (window.innerWidth);
    setTimeout(() => {
        Context.height = Context.canvas.height = (window.innerHeight);
    }, 0);
}

function getFPS() {
    let now = performance.now();
    let diff = now - lastAnimationTime;
    lastAnimationTime = now;
    return (1/diff)*1000;
}


export function journal(message){
    journalEntries.push({
        date: new Date(),
        message: message,
    });
    if(journalEntries.length>maxJournalLength) {
        journalEntries.shift();
    }
}

function showDebug() {
    graphic.fillStyle('white');
    graphic.textAlign('left', 'top');
    graphic.textStyle('12px monospace');
    
    // misc
    graphic.text('inputcache:'+ inputCache.length, 15, 40);
    graphic.text('framesToSkip:'+ framesToSkip, 15, 60);
    graphic.text('FPS:'+ Math.round(Context.fps), 15, 80);
    graphic.text('deltatime:'+ (Context.deltaTime), 15, 100);
    graphic.text('width:'+Context.width+' - height:'+Context.height, 15, 120);
    for(let i=0;i<journalEntries.length;i++) {
        graphic.text('> '+journalEntries[i].message, 15, 150+i*20);
    }
}

function initSocketEvents(callback) {

    // socket.emit('key', 'value');
    socket.on('connected', data => {
        journal('connected to server on '+data.side+' side');
        callback(data);
    });

    socket.on('disconnect', () => {
        journal('disconnected from server');
        loopStopped = true;
    });

    socket.on('gameInformations', data => {
        // journal('gameInformations received');
        pong.processEvent(data);
    });

    socket.on('gameSynchronisation', data => {
        framesToSkip = pong.synchronize(data);
        /*journal('gameSynchronisation received :'+framesToSkip+' frames diff');
        if(framesToSkip > 0) {
            journal('should skip '+framesToSkip+' frames');
        }*/
    });
}

function emitNetworkEvent(data) {
    socket.emit('playerInfo', data);
}

function onKeyDown(event) {
    if(event.keyCode == 40) {
        inputCache.push('d');
    }
    if(event.keyCode == 38) {
        inputCache.push('u');
    }
}

function onKeyUp(event) {
    /*if(event.keyCode == 40) {
        inputCache.push('d');
    }
    if(event.keyCode == 38) {
        inputCache.push('u');
    }*/
}

function initInputNetworkEventLoop() {
    setInterval(()=>{
        emitNetworkEvent(inputCache);
        inputCache = [];
    }, 100);
}

document.addEventListener('DOMContentLoaded', function() {

    initCanvas();

    socket = io();
    initSocketEvents(p => {
        player = p;

        init();
    });

    loop();
});