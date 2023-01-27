import makeWASocket, { useMultiFileAuthState } from '@adiwajshing/baileys'

export const connect = async () => {
    const { state, saveCreds } = await useMultiFileAuthState("auth")
    const conn = makeWASocket({ auth: state })

}