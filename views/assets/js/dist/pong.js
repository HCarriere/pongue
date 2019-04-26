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
/******/ 	return __webpack_require__(__webpack_require__.s = "./shared/pong.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./shared/pong.js":
/*!************************!*\
  !*** ./shared/pong.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\r\n/**\r\n * Shared by front & back code\r\n */\r\nclass Pong {\r\n\r\n    constructor() {\r\n\r\n        /** @type {Brick[]} */\r\n        this.bricks = [\r\n            new Brick(10),\r\n            new Brick(90),\r\n        ];\r\n\r\n        /** @type {Ball[]} */\r\n        this.balls = [\r\n            new Ball(50, 50),\r\n            new Ball(50, 50),\r\n        ];\r\n    }\r\n    \r\n    processFrame() {\r\n        for(const brick of this.bricks) {\r\n            brick.move();\r\n        }\r\n\r\n        for(const ball of this.balls) {\r\n            let collidingBrick = ball.collideWithBricks(this.bricks);\r\n            if(collidingBrick) {\r\n                ball.velocity.y = -ball.velocity.y;\r\n                ball.velocity.x = -ball.velocity.x;\r\n            }\r\n            ball.move();\r\n\r\n        }\r\n    }\r\n\r\n    processEvent(data) {\r\n\r\n    }\r\n\r\n    synchronisation(data) {\r\n        \r\n    }\r\n}\r\n\r\nclass Brick {\r\n\r\n    constructor(x) {\r\n        this.x = x;\r\n        this.y = 50;\r\n        this.width = 2;\r\n        this.height = 10;\r\n    }\r\n\r\n    move() {\r\n\r\n    }\r\n\r\n    requestMove() {\r\n\r\n    }\r\n\r\n    /**\r\n     * \r\n     * @param {Ball} ball \r\n     */\r\n    isColliding(ball) {\r\n        if(ball.x < this.x + this.width && ball.x > this.x - this.width &&\r\n            ball.y < this.y + this.height && ball.y > this.y - this.height) {\r\n            return true;\r\n        }\r\n        return false;\r\n    }\r\n}\r\n\r\nclass Ball {\r\n    \r\n    constructor(x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n        this.width = 2;\r\n        this.height = 2;\r\n        this.velocity = {\r\n            x: Math.random() - 0.5, \r\n            y: 0 //Math.random() - 0.5\r\n        };\r\n    }\r\n\r\n    move() {\r\n        this.x += this.velocity.x;\r\n        this.y += this.velocity.y;\r\n    }\r\n\r\n    /**\r\n     * return a brick if its collide with it\r\n     * @param {Bricks[]} bricks \r\n     * @return {?Brick}\r\n     */\r\n    collideWithBricks(bricks) {\r\n        for(const brick of bricks) {\r\n            if(brick.isColliding(this)) {\r\n                return brick;\r\n            }\r\n        }\r\n        return null;\r\n    }\r\n}\r\n\r\nmodule.exports = {\r\n    Pong,\r\n}\n\n//# sourceURL=webpack:///./shared/pong.js?");

/***/ })

/******/ });