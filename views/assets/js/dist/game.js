/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./front/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./front/game.js":
/*!***********************!*\
  !*** ./front/game.js ***!
  \***********************/
/*! exports provided: Context, player, journal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Context\", function() { return Context; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"player\", function() { return player; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"journal\", function() { return journal; });\n/* harmony import */ var _graphic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graphic */ \"./front/graphic.js\");\n/* harmony import */ var _shared_pong__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/pong */ \"./shared/pong.js\");\n/* harmony import */ var _shared_pong__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_shared_pong__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _pongGraphics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pongGraphics */ \"./front/pongGraphics.js\");\n\r\n\r\n\r\n\r\n/** \r\n * Calculation per seconds targeted from server\r\n * @type {Number} \r\n */\r\nconst CPS_TARGET = 10;\r\n\r\n/**\r\n * All of canvas properties\r\n */\r\nlet Context = {\r\n    ctx:null,\r\n    canvas:null,\r\n    width:null,\r\n    height:null,\r\n    frameCount:null,\r\n    fps:null,\r\n    deltaTime:null,\r\n}\r\nlet player;\r\n\r\n/** @type {Pong} */\r\nlet pong;\r\n\r\nconst maxJournalLength = 20;\r\n\r\nlet framesToSkip;\r\n\r\n/** @type {Socket} */\r\nlet socket;\r\nlet lastAnimationTime;\r\nlet journalEntries = [];\r\nlet inputCache = [];\r\n\r\nlet loopStopped = true;\r\n\r\nfunction init() {\r\n\r\n    pong = new _shared_pong__WEBPACK_IMPORTED_MODULE_1__[\"Pong\"]();\r\n\r\n    initInputNetworkEventLoop();\r\n\r\n    journal('initialisation done');\r\n    loopStopped = false;\r\n}\r\n\r\nfunction loop() {\r\n    // clear screen\r\n    Context.ctx.clearRect(0, 0, Context.canvas.width, Context.canvas.height);\r\n    \r\n    if(!loopStopped) {\r\n        if(framesToSkip > 0) {\r\n            framesToSkip--;\r\n        } else {\r\n            pong.processFrame(Context.deltaTime);\r\n        }\r\n        Object(_pongGraphics__WEBPACK_IMPORTED_MODULE_2__[\"drawPong\"])(pong);\r\n    }\r\n    showDebug();\r\n    \r\n    // get fps & delta time\r\n    Context.fps = getFPS();\r\n    Context.deltaTime = CPS_TARGET / Context.fps;\r\n    Context.frameCount++;\r\n    // execute next iteration\r\n    requestAnimationFrame(loop);\r\n}\r\n\r\n\r\nfunction initCanvas() {\r\n    // init canvases\r\n    Context.canvas = document.getElementById('game');\r\n    Context.ctx = Context.canvas.getContext('2d');\r\n    Context.frameCount = 0;\r\n\r\n    // windows events\r\n    window.onresize = resizeCanvas;\r\n    window.onkeydown = event => onKeyDown(event);\r\n    window.onkeyup = event => onKeyUp(event);\r\n    Context.canvas.addEventListener('contextmenu', event => event.preventDefault());\r\n\r\n    // canvas size\r\n    Context.width = Context.canvas.width = (window.innerWidth) - 100;\r\n    Context.height = Context.canvas.height = (window.innerHeight) - 100;\r\n    resizeCanvas();\r\n}\r\n\r\nfunction resizeCanvas() {\r\n    Context.width = Context.canvas.width = (window.innerWidth);\r\n    setTimeout(() => {\r\n        Context.height = Context.canvas.height = (window.innerHeight);\r\n    }, 0);\r\n}\r\n\r\nfunction getFPS() {\r\n    let now = performance.now();\r\n    let diff = now - lastAnimationTime;\r\n    lastAnimationTime = now;\r\n    return (1/diff)*1000;\r\n}\r\n\r\n\r\nfunction journal(message){\r\n    journalEntries.push({\r\n        date: new Date(),\r\n        message: message,\r\n    });\r\n    if(journalEntries.length>maxJournalLength) {\r\n        journalEntries.shift();\r\n    }\r\n}\r\n\r\nfunction showDebug() {\r\n    _graphic__WEBPACK_IMPORTED_MODULE_0__[\"fillStyle\"]('white');\r\n    _graphic__WEBPACK_IMPORTED_MODULE_0__[\"textAlign\"]('left', 'top');\r\n    _graphic__WEBPACK_IMPORTED_MODULE_0__[\"textStyle\"]('12px monospace');\r\n    \r\n    // misc\r\n    _graphic__WEBPACK_IMPORTED_MODULE_0__[\"text\"]('inputcache:'+ inputCache.length, 15, 40);\r\n    _graphic__WEBPACK_IMPORTED_MODULE_0__[\"text\"]('framesToSkip:'+ framesToSkip, 15, 60);\r\n    _graphic__WEBPACK_IMPORTED_MODULE_0__[\"text\"]('FPS:'+ Math.round(Context.fps), 15, 80);\r\n    _graphic__WEBPACK_IMPORTED_MODULE_0__[\"text\"]('deltatime:'+ (Context.deltaTime), 15, 100);\r\n    _graphic__WEBPACK_IMPORTED_MODULE_0__[\"text\"]('width:'+Context.width+' - height:'+Context.height, 15, 120);\r\n    for(let i=0;i<journalEntries.length;i++) {\r\n        _graphic__WEBPACK_IMPORTED_MODULE_0__[\"text\"]('> '+journalEntries[i].message, 15, 150+i*20);\r\n    }\r\n}\r\n\r\nfunction initSocketEvents(callback) {\r\n\r\n    // socket.emit('key', 'value');\r\n    socket.on('connected', data => {\r\n        journal('connected to server on '+data.side+' side');\r\n        callback(data);\r\n    });\r\n\r\n    socket.on('disconnect', () => {\r\n        journal('disconnected from server');\r\n        loopStopped = true;\r\n    });\r\n\r\n    socket.on('gameInformations', data => {\r\n        // journal('gameInformations received');\r\n        pong.processEvent(data);\r\n    });\r\n\r\n    socket.on('gameSynchronisation', data => {\r\n        framesToSkip = pong.synchronize(data);\r\n        /*journal('gameSynchronisation received :'+framesToSkip+' frames diff');\r\n        if(framesToSkip > 0) {\r\n            journal('should skip '+framesToSkip+' frames');\r\n        }*/\r\n    });\r\n}\r\n\r\nfunction emitNetworkEvent(data) {\r\n    socket.emit('playerInfo', data);\r\n}\r\n\r\nfunction onKeyDown(event) {\r\n    if(event.keyCode == 40) {\r\n        inputCache.push('d');\r\n    }\r\n    if(event.keyCode == 38) {\r\n        inputCache.push('u');\r\n    }\r\n}\r\n\r\nfunction onKeyUp(event) {\r\n    /*if(event.keyCode == 40) {\r\n        inputCache.push('d');\r\n    }\r\n    if(event.keyCode == 38) {\r\n        inputCache.push('u');\r\n    }*/\r\n}\r\n\r\nfunction initInputNetworkEventLoop() {\r\n    setInterval(()=>{\r\n        emitNetworkEvent(inputCache);\r\n        inputCache = [];\r\n    }, 100);\r\n}\r\n\r\ndocument.addEventListener('DOMContentLoaded', function() {\r\n\r\n    initCanvas();\r\n\r\n    socket = io();\r\n    initSocketEvents(p => {\r\n        player = p;\r\n\r\n        init();\r\n    });\r\n\r\n    loop();\r\n});\n\n//# sourceURL=webpack:///./front/game.js?");

/***/ }),

/***/ "./front/graphic.js":
/*!**************************!*\
  !*** ./front/graphic.js ***!
  \**************************/
/*! exports provided: fillStyle, strokeStyle, rect, rectPercent, strokeRect, circle, stroke, image, loadImage, clearImageStore, text, textStyle, textAlign, setBackground, getRandomColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fillStyle\", function() { return fillStyle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"strokeStyle\", function() { return strokeStyle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rect\", function() { return rect; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rectPercent\", function() { return rectPercent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"strokeRect\", function() { return strokeRect; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"circle\", function() { return circle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"stroke\", function() { return stroke; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"image\", function() { return image; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadImage\", function() { return loadImage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clearImageStore\", function() { return clearImageStore; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"text\", function() { return text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"textStyle\", function() { return textStyle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"textAlign\", function() { return textAlign; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setBackground\", function() { return setBackground; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRandomColor\", function() { return getRandomColor; });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./front/game.js\");\n\r\n/** @type {Number} */\r\nconst MOD = 1;\r\n/** @type {string[]} */\r\nlet images = [];\r\n\r\n/**\r\n * Set the fill color\r\n * @param {string} color ex: #FF00FF\r\n */\r\nfunction fillStyle(color) {\r\n    _game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].ctx.fillStyle = color;\r\n}\r\n\r\n/**\r\n * Set the stroke color\r\n * @param {string} color ex : #00FF00 \r\n */\r\nfunction strokeStyle(color) {\r\n    _game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].ctx.strokeStyle = color;\r\n}\r\n\r\n/**\r\n * Fill a rectangle\r\n * @param {number} x \r\n * @param {number} y \r\n * @param {number} wid \r\n * @param {number} hei \r\n */\r\nfunction rect(x, y, wid, hei) {\r\n    _game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].ctx.fillRect(x*MOD | 0, y*MOD | 0, wid*MOD | 0, hei*MOD | 0);\r\n}\r\n\r\n/**\r\n * Fill a rectangle with percent values\r\n * @param {number} x \r\n * @param {number} y \r\n * @param {number} wid \r\n * @param {number} hei \r\n */\r\nfunction rectPercent(x, y, wid, hei) {\r\n    _game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].ctx.fillRect(\r\n        (x*MOD*_game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].width)/100 | 0, \r\n        (y*MOD*_game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].height)/100 | 0, \r\n        (wid*MOD*_game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].width)/100 | 0, \r\n        (hei*MOD*_game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].height)/100 | 0);\r\n}\r\n\r\n/**\r\n * Draw the lines of a rectangle\r\n * @param {number} x \r\n * @param {number} y \r\n * @param {number} wid \r\n * @param {number} hei \r\n */\r\nfunction strokeRect(x, y, wid, hei) {\r\n    _game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].ctx.strokeRect(x*MOD | 0, y*MOD | 0, wid*MOD | 0, hei*MOD | 0);\r\n}\r\n\r\n/**\r\n * Fill & stroke a circle\r\n * @param {number} x \r\n * @param {number} y \r\n * @param {number} radius \r\n */\r\nfunction circle(x, y, radius) {\r\n    _game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].ctx.arc(x*MOD | 0, y*MOD | 0, radius | 0, 0, Math.TWO_PI);\r\n    _game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].ctx.fill();\r\n    _game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].ctx.stroke();\r\n}\r\n\r\n/**\r\n * Draw a line\r\n * @param {number} x \r\n * @param {number} y \r\n * @param {number} x2 \r\n * @param {number} y2 \r\n */\r\nfunction stroke(x, y, x2, y2) {\r\n    _game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].ctx.beginPath();\r\n    _game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].ctx.moveTo(x*MOD | 0, y*MOD | 0);\r\n    _game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].ctx.lineTo(x2*MOD | 0, y2*MOD | 0);\r\n    _game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].ctx.stroke();\r\n    _game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].ctx.moveTo(0, 0);\r\n}\r\n\r\n/**\r\n * Draw a whole image from memory\r\n * @param {*} imageIndice indice from [images]\r\n * @param {*} x \r\n * @param {*} y \r\n */\r\nfunction image(imageIndice, x, y) {\r\n    _game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].ctx.drawImage(imageIndice, x*MOD | 0, y*MOD | 0);\r\n}\r\n\r\n/**\r\n * fetch an image and put it in store\r\n * @param {string} url \r\n * @param {callback} callback \r\n */\r\nfunction loadImage(url, callback) {\r\n    let img = new Image();\r\n    img.onload = () => {\r\n        callback(images.push(this));\r\n    }\r\n    img.src = url;\r\n}\r\n\r\nfunction clearImageStore() {\r\n    images = [];\r\n}\r\n\r\n\r\nfunction text(str, x, y) {\r\n    _game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].ctx.fillText(str, x*MOD | 0, y*MOD | 0)\r\n}\r\n\r\n\r\nfunction textStyle(str) {\r\n    _game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].ctx.font = str;\r\n}\r\n\r\n\r\nfunction textAlign(vertical, horizontal) {\r\n    _game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].ctx.textAlign = vertical;\r\n    _game__WEBPACK_IMPORTED_MODULE_0__[\"Context\"].ctx.textBaseline = horizontal;\r\n}\r\n\r\n\r\nfunction setBackground(image) {\r\n    \r\n}\r\n\r\nfunction getRandomColor() {\r\n    let letters = '0123456789ABCDEF';\r\n    let color = '#';\r\n    for (let i = 0; i < 6; i++) {\r\n        color += letters[Math.floor(Math.random() * 16)];\r\n    }\r\n    return color;\r\n}\n\n//# sourceURL=webpack:///./front/graphic.js?");

/***/ }),

/***/ "./front/pongGraphics.js":
/*!*******************************!*\
  !*** ./front/pongGraphics.js ***!
  \*******************************/
/*! exports provided: drawPong */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawPong\", function() { return drawPong; });\n/* harmony import */ var _graphic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graphic */ \"./front/graphic.js\");\n/* harmony import */ var _shared_pong__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/pong */ \"./shared/pong.js\");\n/* harmony import */ var _shared_pong__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_shared_pong__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ \"./front/game.js\");\n\r\n\r\n\r\n\r\n/**\r\n * Draw pong on canvas\r\n * @param {Pong} pong \r\n */\r\nfunction drawPong(pong) {\r\n    for(const brick of pong.bricks) {\r\n        if(_game__WEBPACK_IMPORTED_MODULE_2__[\"player\"].side == 'left' && brick.x < 50) _graphic__WEBPACK_IMPORTED_MODULE_0__[\"fillStyle\"]('red');\r\n        else if(_game__WEBPACK_IMPORTED_MODULE_2__[\"player\"].side == 'right' && brick.x > 50) _graphic__WEBPACK_IMPORTED_MODULE_0__[\"fillStyle\"]('red');\r\n        else _graphic__WEBPACK_IMPORTED_MODULE_0__[\"fillStyle\"]('white');\r\n        \r\n        _graphic__WEBPACK_IMPORTED_MODULE_0__[\"rectPercent\"](brick.x, brick.y, brick.width, brick.height);\r\n    }\r\n\r\n    for(const ball of pong.balls) {\r\n        _graphic__WEBPACK_IMPORTED_MODULE_0__[\"fillStyle\"]('white');\r\n        _graphic__WEBPACK_IMPORTED_MODULE_0__[\"rectPercent\"](ball.x, ball.y, ball.width, ball.height);\r\n    }\r\n}\n\n//# sourceURL=webpack:///./front/pongGraphics.js?");

/***/ }),

/***/ "./shared/pong.js":
/*!************************!*\
  !*** ./shared/pong.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Written in ModuleJS\r\n\r\n/**\r\n * Shared by front & back code\r\n */\r\nclass Pong {\r\n\r\n    constructor() {\r\n\r\n        /** @type {Brick[]} */\r\n        this.bricks = [\r\n            new Brick(10, 50),\r\n            new Brick(90, 50),\r\n        ];\r\n\r\n        /** @type {Ball[]} */\r\n        this.balls = [\r\n            new Ball(50, 50, {x:2, y:Math.random()*2 - 1}),\r\n            // new Ball(50, 50, {x:-1, y:Math.random() - 0.5}),\r\n        ];\r\n\r\n        /** @type {Number} */\r\n        this.currentFrame = 0;\r\n    }\r\n    \r\n    /**\r\n     * Process a pong frame\r\n     * Multiply distance with a deltaTime\r\n     * @param {Number} deltaTime \r\n     */\r\n    processFrame(deltaTime = 1) {\r\n        /*for(const brick of this.bricks) {\r\n            brick.move(deltaTime);\r\n        }*/\r\n\r\n        // ball physic\r\n        for(const ball of this.balls) {\r\n            let collidingBrick = ball.collideWithBricks(this.bricks);\r\n            if(collidingBrick || ball.collideWithXWalls()) {\r\n                ball.velocity.x = -ball.velocity.x;\r\n            }\r\n            if(ball.collideWithYWalls()) {\r\n                ball.velocity.y = -ball.velocity.y;\r\n            }\r\n            ball.move(deltaTime);\r\n\r\n        }\r\n\r\n        this.currentFrame+=deltaTime;\r\n    }\r\n\r\n    /**\r\n     * Process only some user inputs\r\n     * @param {Object} data \r\n     */\r\n    processEvent(data) {\r\n        for(let brick of this.bricks) {\r\n            if(brick.x < 50) {\r\n                // left\r\n                let sum = 0;\r\n                for(let c of data.left) {\r\n                    if(c == 'u') sum-=1;\r\n                    if(c == 'd') sum+=1;\r\n                }\r\n                brick.y += sum;\r\n            } else {\r\n                // right\r\n                let sum = 0;\r\n                for(let c of data.right) {\r\n                    if(c == 'u') sum-=1;\r\n                    if(c == 'd') sum+=1;\r\n                }\r\n                brick.y += sum;\r\n            }\r\n        }\r\n    }\r\n\r\n    /**\r\n     * Synchronise the whole pong game state\r\n     * @param {Object} data \r\n     * @returns {Number} number of frame you must skip because you are in advance\r\n     */\r\n    synchronize(data) {\r\n        if(data.frame >= this.currentFrame) {\r\n            // late, catch up\r\n            this.bricks = [];\r\n            for(let brick of data.bricks) {\r\n                this.bricks.push(new Brick(brick.x, brick.y));\r\n            }\r\n\r\n            this.balls = [];\r\n            for(let ball of data.balls) {\r\n                this.balls.push(new Ball(ball.x, ball.y, ball.velocity));\r\n            }\r\n            this.currentFrame = data.frame;\r\n        }\r\n        // in advance, skip next frames\r\n        return this.currentFrame - data.frame;\r\n    }\r\n\r\n    /**\r\n     * Returns the whole game state\r\n     * @returns {Object} \r\n     */\r\n    getSynchronisation() {\r\n        return {\r\n            bricks: this.bricks,\r\n            balls: this.balls,\r\n            frame: this.currentFrame,\r\n        }\r\n    }\r\n}\r\n\r\nclass Brick {\r\n\r\n    constructor(x, y, width, height) {\r\n        this.x = x;\r\n        this.y = y;\r\n        this.width = 2;\r\n        this.height = 10;\r\n    }\r\n\r\n    move(deltaTime) {\r\n\r\n    }\r\n\r\n    requestMove() {\r\n\r\n    }\r\n\r\n    /**\r\n     * \r\n     * @param {Ball} ball \r\n     */\r\n    isColliding(ball) {\r\n        if(ball.x < this.x + this.width && ball.x > this.x - this.width &&\r\n            ball.y < this.y + this.height && ball.y > this.y - this.height) {\r\n            return true;\r\n        }\r\n        return false;\r\n    }\r\n}\r\n\r\nclass Ball {\r\n    \r\n    constructor(x, y, velocity) {\r\n        this.x = x;\r\n        this.y = y;\r\n        this.width = 1;\r\n        this.height = 2;\r\n        this.velocity = velocity;\r\n    }\r\n\r\n    move(deltaTime) {\r\n        this.x += this.velocity.x * deltaTime;\r\n        this.y += this.velocity.y * deltaTime;\r\n    }\r\n\r\n    /**\r\n     * return a brick if its collide with it\r\n     * @param {Bricks[]} bricks \r\n     * @return {?Brick}\r\n     */\r\n    collideWithBricks(bricks) {\r\n        for(const brick of bricks) {\r\n            if(brick.isColliding(this)) {\r\n                return brick;\r\n            }\r\n        }\r\n        return null;\r\n    }\r\n\r\n    /**\r\n     * Returns true if it collide with a LEFT or RIGHT wall\r\n     * @returns {Boolean}\r\n     */\r\n    collideWithXWalls() {\r\n        return this.x <= 0 || this.x >= 100;\r\n    }\r\n\r\n    /**\r\n     * Returns true if it collide with a UP or DOWN wall\r\n     * @returns {Boolean}\r\n     */\r\n    collideWithYWalls() {\r\n        return this.y <= 0 || this.y >= 100;\r\n    }\r\n}\r\n\r\nmodule.exports = {\r\n    Pong,\r\n}\n\n//# sourceURL=webpack:///./shared/pong.js?");

/***/ })

/******/ });