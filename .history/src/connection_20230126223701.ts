import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@adiwajshing/baileys';
import { Boom } from '@hapi/boom';

export interface ConnectConfig {
    authPath: string
}

export type Bot = {

}

export const connect = async (bot: Bot, config: ConnectConfig) => {
    const { state, saveCreds } = await useMultiFileAuthState(config.authPath);

    const conn = makeWASocket({ auth: state });

    conn.ev.on('creds.update', saveCreds);
    conn.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;

            console.log('connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect);

            if (shouldReconnect) {
                connect(config);
            }
        } else if (connection === 'open') {
            console.log('');
        }
    });
    conn.ev.on('messages.upsert', () => {

    });
    
    return conn
}