import type { Message } from '../../client/models/message';
import crypto from 'crypto';

const initialMessages: Message[] = [
    {
        id: crypto.randomUUID(),
        userId: 'Алиса',
        text: 'Привет всем! Как дела?',
        createdAt: Date.now() - 120000
    },
    {
        id: crypto.randomUUID(),
        userId: 'Боб',
        text: 'Привет, Алиса! Всё отлично. Как твой проект?',
        createdAt: Date.now() - 90000 
    },
    {
        id: crypto.randomUUID(),
        userId: 'Чарли',
        text: 'Рад видеть всех здесь! У кого-нибудь есть интересные новости?',
        createdAt: Date.now() - 60000 
    },
    {
        id: crypto.randomUUID(),
        userId: 'Дэн',
        text: 'Всем привет! Я тут немного опаздываю. Есть что-то важное?',
        createdAt: Date.now() - 30000
    },
    {
        id: crypto.randomUUID(),
        userId: 'Ева',
        text: 'Нет, Дэн, ничего не пропустил. Добро пожаловать!',
        createdAt: Date.now() - 10000
    }
];

let messages: Message[] = [...initialMessages];

export class MessageDB {
    public getAllMessages(): Message[] {
        return messages;
    }
    
    
    public createMessage(message: Message): Message {
        messages.push(message);
        return message;
    }

    public getMessageById(id: string): Message | undefined {
        return messages.find(msg => msg.id === id);
    }

    public updateMessage(id: string, data: { userId?: string; text?: string }): Message | undefined {
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


    public deleteMessage(id: string): boolean {
        const initialLength = messages.length;
        messages = messages.filter(msg => msg.id !== id);
        return messages.length < initialLength;
    }
}
