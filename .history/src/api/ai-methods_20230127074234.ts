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
    const response = openai.createImage({
        prompt: '',
        n: 1
        si
    })
    console.log(response.data.choices);
    
    let entitys = response.data.choices[0].text?.trim()
    return entitys
}