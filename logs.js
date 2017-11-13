"use strict";

//Loading colors module to make display more readable, made global
var colors = require('colors');

class Logs {

    constructor(colors) {
        this.colors = colors;
    }

    log(message) {
        process.stdout.write(message);
    }

    info(message) {
        process.stdout.write(this.colors.cyan(message));
    }

    warning(message) {
        process.stdout.write(this.colors.yellow(message));
    }

    error(message) {
        process.stdout.write(this.colors.red(message));
    }

    success(message) {
        process.stdout.write(this.colors.green(message));
    }
}

module.exports = new Logs(colors);