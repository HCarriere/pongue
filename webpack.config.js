const path = require('path');

module.exports = {
    entry: {
        game:'./front/game.js',
    },
    output: {
        path: path.resolve(__dirname, 'views/assets/js/dist'),
        filename: '[name].js'
    },
    mode:'development'
};
