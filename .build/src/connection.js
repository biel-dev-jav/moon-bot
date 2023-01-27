"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.connect = void 0;
const baileys_1 = __importStar(require("@adiwajshing/baileys"));
const ai_methods_1 = require("./api/ai-methods");
const connect = (bot, config) => __awaiter(void 0, void 0, void 0, function* () {
    const { state, saveCreds } = yield (0, baileys_1.useMultiFileAuthState)(config.authPath);
    const conn = (0, baileys_1.default)({ auth: state });
    let global = {};
    conn.ev.on('creds.update', saveCreds);
    conn.ev.on('connection.update', (update) => {
        var _a, _b;
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = ((_b = (_a = lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) !== baileys_1.DisconnectReason.loggedOut;
            console.log('connection closed due to ', lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error, ', reconnecting ', shouldReconnect);
            if (shouldReconnect) {
                (0, exports.connect)(bot, config);
            }
        }
        else if (connection === 'open') {
            console.log(`${bot.name} está on!`);
        }
    });
    conn.ev.on('messages.upsert', ({ messages }) => {
        messages.forEach((message) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            let channel = {
                art: yield conn.groupMetadata("120363048224499981@g.us")
            };
            if (message.key.remoteJid == 'status@broadcast')
                return;
            if (!message.message)
                return;
            let text = ((_b = (_a = message.message) === null || _a === void 0 ? void 0 : _a.extendedTextMessage) === null || _b === void 0 ? void 0 : _b.text) || ((_c = message.message) === null || _c === void 0 ? void 0 : _c.conversation) || ((_e = (_d = message.message) === null || _d === void 0 ? void 0 : _d.imageMessage) === null || _e === void 0 ? void 0 : _e.caption) || '';
            if (message.key.fromMe)
                return;
            if (!text.startsWith(bot.prefix))
                return;
            let command = text.split(" ")[0].replace(bot.prefix, "");
            let prompt = text.replace(bot.prefix + command + " ", "");
            switch (command) {
                case 'imagine': {
                    if (yield (0, ai_methods_1.isViolating)(prompt))
                        return conn.sendMessage(message.key.remoteJid, {
                            text: "O prompt ```ˮ" + prompt + "ˮ``` Viola nossos termos de uso ou privacidade, por favor verique-o e tente novamente."
                        });
                    prompt = (yield (0, ai_methods_1.moreContext)(prompt));
                    let waitMessage = (yield (0, ai_methods_1.generateWaitSentence)(message.pushName, prompt));
                    yield conn.sendMessage(message.key.remoteJid, {
                        text: waitMessage
                    }, { quoted: message });
                    (0, ai_methods_1.imagine)(prompt)
                        .then((url) => __awaiter(void 0, void 0, void 0, function* () {
                        yield conn.sendMessage(channel.art.id, {
                            image: { url: url },
                            caption: "```ˮ" + prompt + "ˮ```\n\nby _*" + message.pushName + "*_"
                        });
                    }))
                        .catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                        yield conn.sendMessage(message.key.remoteJid, {
                            text: "Houve um problema inesperado ao gerar sua arte com o prompt: ```*„" + prompt + "ˮ*```\n\n Erro: " + err
                        }, { quoted: message });
                    }));
                    break;
                }
                case 'wait': {
                    if (yield (0, ai_methods_1.isViolating)(prompt))
                        return conn.sendMessage(message.key.remoteJid, {
                            text: "O prompt ```ˮ" + prompt + "ˮ``` Viola nossos termos de uso ou privacidade, por favor verique-o e tente novamente."
                        });
                    prompt = (yield (0, ai_methods_1.generateWaitSentence)(message.pushName, prompt));
                    yield conn.sendMessage(message.key.remoteJid, {
                        text: prompt
                    }, { quoted: message });
                    break;
                }
                case 'responder': {
                    if (yield (0, ai_methods_1.isViolating)(prompt))
                        return conn.sendMessage(message.key.remoteJid, {
                            text: "O prompt ```ˮ" + prompt + "ˮ``` Viola nossos termos de uso ou privacidade, por favor verique-o e tente novamente."
                        });
                    prompt = (yield (0, ai_methods_1.promptToCommand)(prompt, bot.prefix));
                    yield conn.sendMessage(message.key.remoteJid, {
                        text: prompt
                    }, { quoted: message });
                    break;
                }
            }
        }));
    });
    return conn;
});
exports.connect = connect;
