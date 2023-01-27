
export class IChat {
    jid: string
    constructor(conn: WAS,jid: string) {
        this.jid = jid
    }
}