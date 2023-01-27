import { Configuration, OpenAIApi, CreateModerationRequest } from 'openai'

const config = new Configuration({
    apiKey: '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'
})

const openai = new OpenAIApi(config)
const politic = new CreateModerationRequest()

const isViolating = async (text: string) => {
    const response = openai.createModeration()
}

const NERFind = (text: string) => {

}