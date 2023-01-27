import { WASocket } from "@adiwajshing/baileys"

export class IUser {

    public jid: string
    public  name: string

    constructor(name: string, jid: string, ) {
        this.jid = jid
        this.name = name
    }

    
}