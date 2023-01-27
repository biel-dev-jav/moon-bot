import { Configuration, OpenAIApi, CreateModerationRequest } from 'openai'

const config = new Configuration({
    apiKey: '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'
})

const openai = new OpenAIApi(config)

const isViolating = async (text: string) => {
    const response = (await openai.createModeration({
        model: "text-moderation-001",
        input: text
    })).data.results[0]

    return response.flagged
}

const NERFind = (text: string) => {
    const response = (await openai.createCompletion({
        model: "text-curie-001",
        prompt: `Obtenha as entidades nomeadas dos textos as seguir
texto: Eu `
    }))
}