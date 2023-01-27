"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagine = exports.moreContext = exports.generateWaitSentence = exports.promptToCommand = exports.isViolating = void 0;
const openai_1 = require("openai");
const config = new openai_1.Configuration({
    apiKey: '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'
});
const openai = new openai_1.OpenAIApi(config);
const isViolating = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    const response = (yield openai.createModeration({
        input: prompt
    })).data.results[0];
    return response.flagged;
});
exports.isViolating = isViolating;
const promptToCommand = (prompt, prefix) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const response = yield openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Responda APENAS as questões informativas a seguir

pergunta: Nossa eu comi um boi hoje!
resposta: none

pergunta: Tipo, acho que vale a pena
resposta: none

pergunta: Quem colonizou o Brasil?
resposta: Portugal colonizou o Brasil.

pergunta: Nossa cara como você está?
responta: none

pergunta: Ele realmente está bem?
resposta: none

pergunta: ${prompt}
resposta:`,
        temperature: 0.9,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0.3,
        presence_penalty: 0.3,
        stop: ['prompt, \n']
    });
    return (_a = response.data.choices[0].text) === null || _a === void 0 ? void 0 : _a.trim().replace(/[*]/, prefix);
});
exports.promptToCommand = promptToCommand;
const generateWaitSentence = (nome, prompt) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const response = yield openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Gere uma frase de espera unica e divertida
nome: João
prompt: "A pink flower falling from the sky, dynamic art, souvenir, brush art"
frase: Calma amigo, estou indo em meu jardim pegar uma linda flor rosa para você 🌸!

nome: Rafaela
prompt: "A beautiful blue bird flying, dynamic photo, photorealistic"
frase: Ummh cade?... Cade?... Oh achei!... Um lindo pássaro para fotografar Rafaela!

nome: Gabriela
prompt: "A mysterious dark figure leaving a trail of shadows as it walks, digital art, brush art, done by Da Vinci, dark and surreal art."
frase: Ei Gabriela, você viu aquele vulto passando por aqui 👻?... Acho que sua arte ganhou vida 😱😱!

nome: ${nome}
prompt: "${prompt}"
frase:`,
        temperature: 1,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0.3,
        presence_penalty: 0.3,
        stop: ['nome, \n']
    });
    return (_b = response.data.choices[0].text) === null || _b === void 0 ? void 0 : _b.trim();
});
exports.generateWaitSentence = generateWaitSentence;
const moreContext = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const response = yield openai.createCompletion({
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
    });
    return (_c = response.data.choices[0].text) === null || _c === void 0 ? void 0 : _c.trim();
});
exports.moreContext = moreContext;
const imagine = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield openai.createImage({
        prompt: prompt,
        n: 1,
        size: '512x512'
    });
    return response.data.data[0].url;
});
exports.imagine = imagine;
