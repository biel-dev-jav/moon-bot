"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./src/connection");
const config = {
    authPath: 'auth'
};
const bot = {
    name: 'MoonBot',
    prefix: '/'
};
(0, connection_1.connect)(bot, config);
