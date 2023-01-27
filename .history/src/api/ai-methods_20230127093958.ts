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

export const generate = async (prompt: string) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Gere uma frase sacartisca com os segiuintes dados
nome: MoonDev
prompt: "A pink flower falling from the sky, dynamic art, souvenir, brush art"
`,
        temperature: 1,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0.3,
        presence_penalty: 0.3,
        stop: ['sentence, \n']
    })

    return response.data.choices[0].text?.trim()
}

export const moreContext = async (prompt: string) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Give more context to sentences, to use in DALL-E
sentence: A flower
to: A pink flower falling from the sky, dynamic art, souvenir, brush art

sentence: Um lindo passaro voando, com uma planta na boca, direto para um lindo por do sol
to: A beautiful blue bird flying, with a sunflower in its mouth, straight into a beautiful sunset, bird's eye view, artwork by Da Vince, digital art, vibrant strokes, brush art, deep art, sentimental art.

sentence: A small apple falling on a lawn
to: A small apple lying on a lawn next to a tree, digital art, brush art, done by Da Vince

sentence: ${prompt}
to:`,
        temperature: 1,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0.3,
        presence_penalty: 0.3,
        stop: ['sentence, \n']
    })

    return response.data.choices[0].text?.trim()
}

export const imagine = async (prompt: string) => {
    const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: '512x512'
    })

    return response.data.data[0].url
}