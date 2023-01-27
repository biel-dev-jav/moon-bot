import { WASocket } from "@adiwajshing/baileys"

export class IUser {

    public jid: string
    public name: string

    constructor(name: string, jid: string, histo) {
        this.jid = jid
        this.name = name
    }

    
}