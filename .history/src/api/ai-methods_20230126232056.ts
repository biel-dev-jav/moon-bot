import { Configuration, OpenAIApi, CreateModerationRequest } from 'openai'

const config = new Configuration({
    apiKey: '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'
})

const openai = new OpenAIApi(config)

const isViolating = async (text: string) => {
    const response = (await openai.createModeration({
        model: "text-moderation-001",
        input: text
    })).data

    return response.
}

const NERFind = (text: string) => {

}