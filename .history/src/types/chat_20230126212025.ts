import { WASocket } from "@adiwajshing/baileys"

export class IChat {

    public jid: string
    private conn: 

    constructor(conn: WASocket, jid: string) {
        this.jid = jid
        this.conn = conn
    }
}