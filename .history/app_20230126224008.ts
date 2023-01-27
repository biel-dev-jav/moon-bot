import { Bot, ConnectConfig, connect } from "./src/connection";

const config: ConnectConfig = {
    authPath: 'auth'
}

const bot: Bot = {
    name: 'MoonBot',
    
}


connect(bot, config);