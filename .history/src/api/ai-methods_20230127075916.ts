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

export const imagine = async (conn: WASocket, message: proto.IWebMessageInfo, prompt: string) => {
    if (isViolating(prompt)) return conn.sendMessage(message.key.remoteJid!, {
        text: "O prompt ```*„" + prompt + "ˮ*``` Viola nossos termos de uso ou privacidade, por favor verique-o e tente novamente."
    })

    const response = openai.createImage({
        prompt: '',
        n: 1,
        size: '512x512'
    }).then(response => {
        let entitys = response.data.choices[0].text?.trim()
        return entitys
    }).catch(err => {
        conn.sendMessage(message.key.remoteJid!, {
            text: "Houve um problema inesperado ao gerar sua arte com o prompt: ```*„" + prompt + "ˮ*```\n\n Erro: " + err
        }, { quoted: message })
    })
}