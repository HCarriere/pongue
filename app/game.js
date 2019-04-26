const socketio = require('socket.io');

let Pong = require('../shared/pong').Pong;

const SHORT_LOOP_FREQ = 100;
const LONG_LOOP_FREQ = 2000;

let pongShortInstance;
let pongLongInstance;
let players = {};
let leftPlayers = 0;
let rightPlayers = 0;
let gameInformations = createGameInformations();


/** @type {Pong} */
let pong;

function init(http) {
    let io = socketio(http);

    pong = new Pong();    

    io.on('connection', socket => {
        
        let player = createPlayer(socket);
        
        players[socket.id] = player;
        if(player.side == 'right') {
            rightPlayers++;
        }
        if(player.side == 'left') {
            leftPlayers++;
        }

        socket.emit('connected', player);

        socket.on('playerInfo', data => {
            processPlayerInfo(data, player);
        });

        socket.on('disconnect', () => {
            if(player.side == 'right') {
                rightPlayers--;
            }
            if(player.side == 'left') {
                leftPlayers--;
            }
            delete players[player.id];
        });
    });

    gameLoops(io);

    console.log('socket.io initialised');
}

function gameLoops(io) {
    pongShortInstance = setInterval(() => {
        // SHORT LOOP
        pong.processFrame();

        if(gameInformations.left.length > 0 || gameInformations.right.length > 0) {
            pong.processEvent(gameInformations);
            io.emit('gameInformations', gameInformations);
            gameInformations = createGameInformations();
        }
    }, SHORT_LOOP_FREQ);

    pongLongInstance = setInterval(() => {
        // LONG LOOP

        io.emit('gameSynchronisation', pong.getSynchronisation());

    }, LONG_LOOP_FREQ);
}

function processPlayerInfo(data, player) {
    let side = players[player.id].side;
    if(side=='left') {
        gameInformations.left = gameInformations.left.concat(data);
    } else if(side == 'right') {
        gameInformations.right = gameInformations.right.concat(data);
    }
}

function createGameInformations() {
    return {
        left:[],
        right:[],
    };
}

function createPlayer(socket) {
    console.log('client connected for id: '+ socket.id);

    return {
        id: socket.id,
        side: leftPlayers<=rightPlayers ? 'left':'right'
    };
}


module.exports = {
    init,
}