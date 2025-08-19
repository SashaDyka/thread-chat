"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDB = void 0;
const crypto_1 = __importDefault(require("crypto"));
const initialMessages = [
    {
        id: crypto_1.default.randomUUID(),
        userId: 'Алиса',
        text: 'Привет всем! Как дела?',
        createdAt: Date.now() - 120000
    },
    {
        id: crypto_1.default.randomUUID(),
        userId: 'Боб',
        text: 'Привет, Алиса! Всё отлично. Как твой проект?',
        createdAt: Date.now() - 90000
    },
    {
        id: crypto_1.default.randomUUID(),
        userId: 'Чарли',
        text: 'Рад видеть всех здесь! У кого-нибудь есть интересные новости?',
        createdAt: Date.now() - 60000
    },
    {
        id: crypto_1.default.randomUUID(),
        userId: 'Дэн',
        text: 'Всем привет! Я тут немного опаздываю. Есть что-то важное?',
        createdAt: Date.now() - 30000
    },
    {
        id: crypto_1.default.randomUUID(),
        userId: 'Ева',
        text: 'Нет, Дэн, ничего не пропустил. Добро пожаловать!',
        createdAt: Date.now() - 10000
    }
];
let messages = [...initialMessages];
class MessageDB {
    getAllMessages() {
        return messages;
    }
    createMessage(message) {
        messages.push(message);
        return message;
    }
    getMessageById(id) {
        return messages.find(msg => msg.id === id);
    }
    updateMessage(id, data) {
        const messageToUpdate = messages.find(msg => msg.id === id);
        if (messageToUpdate) {
            if (data.userId !== undefined) {
                messageToUpdate.userId = data.userId;
            }
            if (data.text !== undefined) {
                messageToUpdate.text = data.text;
            }
            return messageToUpdate;
        }
        return undefined;
    }
    deleteMessage(id) {
        const initialLength = messages.length;
        messages = messages.filter(msg => msg.id !== id);
        return messages.length < initialLength;
    }
}
exports.MessageDB = MessageDB;
