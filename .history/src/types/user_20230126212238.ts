import { WASocket } from "@adiwajshing/baileys"

export class IUser {

    public jid: string
    private conn: WASocket

    constructor(conn: WASocket, jid: string) {
        this.jid = jid
        this.conn = conn
    }
}