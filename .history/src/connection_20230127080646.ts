import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@adiwajshing/baileys';
import { Boom } from '@hapi/boom';
import { imagine, isViolating } from './api/ai-methods';

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
    let channel ={

    }

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
        messages.forEach(async message => {
            if (message.key.remoteJid! == 'status@broadcast') return
            if (!message.message) return

            const text = message.message?.extendedTextMessage?.text || message.message?.conversation || message.message?.imageMessage?.caption || ''

            if (!text.startsWith(bot.prefix)) return

            const command = text.split(" ")[0].replace(bot.prefix, "")
            const param = text.replace(bot.prefix + command + " ", "")

            switch (command) {
                case 'imagine': {
                    if (await isViolating(param)) return conn.sendMessage(message.key.remoteJid!, {
                        text: "🚫 CONTEUDO SENSIVEL DETECTADO 🚫\n\nPor favor verifique seu prompt e tente novamente!"
                    })
                }
            }
        })
    });
    
    return conn
}