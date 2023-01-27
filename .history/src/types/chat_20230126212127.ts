import { WASocket } from "@adiwajshing/baileys"

export class IChat {

    public jid: string
    private conn: WASocket

    constructor(conn: WASocket, jid: string) {
        this.jid = jid
        this.conn = conn
    }

    public get name() {
        this.conn
    }
}