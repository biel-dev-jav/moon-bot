import { WASocket } from "@adiwajshing/baileys"

export class IChat {
    public jid: string

    
    constructor(conn: WASocket, jid: string) {
        this.jid = jid
        this.conn = conn
    }
}