import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@adiwajshing/baileys';
import { Boom } from '@hapi/boom';

export interface ConnectConfig {
    prefix: s
}

export const connect = async () => {
    const { state, saveCreds } = await useMultiFileAuthState("auth");

    const conn = makeWASocket({ auth: state });

    conn.ev.on('creds.update', saveCreds);
    conn.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;

            console.log('connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect);

            if (shouldReconnect) {
                connect();
            }
        } else if (connection === 'open') {
            console.log('opened connection');
        }
    });
    conn.ev.on('messages.upsert', () => {

    });
    
    return conn
}