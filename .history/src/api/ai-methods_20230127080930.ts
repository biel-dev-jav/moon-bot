import { WASocket, proto } from '@adiwajshing/baileys'
import { Configuration, OpenAIApi, CreateModerationRequest } from 'openai'

const config = new Configuration({
    apiKey: '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'
})

const openai = new OpenAIApi(config)

export const isViolating = async (prompt: string) => {
    const response = (await openai.createModeration({
        input: prompt
    })).data.results[0]

    return response.flagged
}

export const imagine = async (conn: WASocket, message: proto.IWebMessageInfo, channel: string, prompt: string) => {
    
    const response = await openai.createImage({
        prompt: '',
        n: 1,
        size: '512x512'
    }).then(response => {
        let url = response.data.data[0].url
        conn.sendMessage(message.key.remoteJid!, {
            caption: ""
        })
    }).catch(err => {
        conn.sendMessage(message.key.remoteJid!, {
            text: "Houve um problema inesperado ao gerar sua arte com o prompt: ```*„" + prompt + "ˮ*```\n\n Erro: " + err
        }, { quoted: message })
    })

    return tr
}