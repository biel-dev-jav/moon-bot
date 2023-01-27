import { WASocket } from "@adiwajshing/baileys"

export class IChat {
    jid: string
    constructor(conn: WASocket, jid: string) {
        this.jid = jid
    }
}