import { Configuration, OpenAIApi, CreateModerationRequest } from 'openai'

const config = new Configuration({
    apiKey: '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'
})

const openai = new OpenAIApi(config)

const isViolating = async (prompt: string) => {
    const response = (await openai.createModeration({
        model: "text-moderation-001",
        input: prompt
    })).data.results[0]

    return response.flagged
}

const NERFind = async (prompt: string) => {
    const response = (await openai.createCompletion({
        model: "text-curie-001",
        prompt: `Obtenha as entidades nomeadas (NER) dos textos as seguir
texto: Eu irei para a Inglaterra amanhã
NER: Inglaterra

texto: Não gosto de bife
NER: none

texto: Minha tia Leticia foi para São Paulo ontem, porque meu Tio paulo machucou o pé ontem na Bahia
NER: Leticia, São Paulo, Paulo, Bahia

texto: Leticia é uma bela moça, certa ver 
NER: Leticia, São Paulo, Paulo, Bahia

texto: ${prompt}
NER: `,
        temperature: 0.3,
        max_tokens: 200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ['texto', '\n']
    })).data.choices[0]

    let entitys = response.text?.trim()?.split(',')
    return entitys
}