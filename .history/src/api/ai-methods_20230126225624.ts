import { Configuration, OpenAIApi } from 'openai'

const config = new Configuration({
    apiKey
})

const openai = new OpenAIApi()