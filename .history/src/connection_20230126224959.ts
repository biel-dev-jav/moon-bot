import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@adiwajshing/baileys';
import { Boom } from '@hapi/boom';

export interface ConnectConfig {
    authPath: string
}

export type Bot = {
    name: string
    prefix: '.' | '/' | '!' | string
}

export const connect = async (bot: Bot, config: ConnectConfig) => {
    const { state, saveCreds } = await useMultiFileAuthState(config.authPath);

    const conn = makeWASocket({ auth: state });

    let global: any = {}

    conn.ev.on('creds.update', saveCreds);
    conn.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;

            console.log('connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect);

            if (shouldReconnect) {
                connect(bot, config);
            }
        } else if (connection === 'open') {
            console.log(`${bot.name} está on!`);
        }
    });
    conn.ev.on('messages.upsert', ({ messages }) => {
        messages.forEach(message => {
            if (message.key.remoteJid! == 'status@broadcast') return
            if (!message.message) return

            const text = message.message?.extendedTextMessage?.text || message.message?.conversation || message.message?.imageMessage?.caption

            
        })
    });
    
    return conn
}