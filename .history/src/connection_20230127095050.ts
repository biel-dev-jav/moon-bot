import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@adiwajshing/baileys';
import { Boom } from '@hapi/boom';
import { imagine, isViolating, moreContext } from './api/ai-methods';

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
        messages.forEach(async message => {
            let channel = {
                art: await conn.groupMetadata("120363048224499981@g.us")
            }

            if (message.key.remoteJid! == 'status@broadcast') return
            if (!message.message) return

            const text = message.message?.extendedTextMessage?.text || message.message?.conversation || message.message?.imageMessage?.caption || ''

            if (!text.startsWith(bot.prefix)) return

            let command = text.split(" ")[0].replace(bot.prefix, "")
            let prompt = text.replace(bot.prefix + command + " ", "")

            switch (command) {
                case 'imagine': {
                    if (await isViolating(prompt)) return conn.sendMessage(message.key.remoteJid!, {
                        text: "O prompt ```ˮ" + prompt + "ˮ``` Viola nossos termos de uso ou privacidade, por favor verique-o e tente novamente."
                    })

                    prompt = (await moreContext(prompt))!

                    imagine(prompt)
                    .then(async url => {
                        await conn.sendMessage(message.key.remoteJid!, {
                            image: { url: url! },
                            caption: "```ˮ" + prompt + "ˮ```\n\nby _*" + message.pushName + "*_"
                        })
                    })
                    .catch(async err => {
                        await conn.sendMessage(message.key.remoteJid!, {
                            text: "Houve um problema inesperado ao gerar sua arte com o prompt: ```*„" + prompt + "ˮ*```\n\n Erro: " + err
                        }, { quoted: message })
                    })
                }
                case 'sacarstic': {
                    if (await isViolating(prompt)) return conn.sendMessage(message.key.remoteJid!, {
                        text: "O prompt ```ˮ" + prompt + "ˮ``` Viola nossos termos de uso ou privacidade, por favor verique-o e tente novamente."
                    })

                    prompt = generateS

                    await conn.sendMessage(message.key.remoteJid!, {
                        text: ""
                    }, { quoted: message })
                }
            }
        })
    });
    
    return conn
}