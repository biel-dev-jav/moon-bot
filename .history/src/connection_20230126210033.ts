import makeWASocket, { useMultiFileAuthState } from '@adiwajshing/baileys'

export const connect = async () => {
    const { state, saveCreds } = await useMultiFileAuthState("")
}