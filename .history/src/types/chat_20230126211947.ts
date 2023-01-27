import { WASocket } from "@adiwajshing/baileys"

export class IChat {

    public jid: string
    pri

    constructor(conn: WASocket, jid: string) {
        this.jid = jid
        this.conn = conn
    }
}