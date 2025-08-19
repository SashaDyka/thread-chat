import type { Message } from '../../client/models/message';
import crypto from 'crypto';

const initialMessages: Message[] = [
    {
        id: crypto.randomUUID(),
        userId: 'Liam',
        text: "Hey everyone, hope you're all having a great week!",
        createdAt: Date.now() - 150000
    },
    {
        id: crypto.randomUUID(),
        userId: 'Olivia',
        text: "Thanks, you too! Just finished a big meeting.",
        createdAt: Date.now() - 110000
    },
    {
        id: crypto.randomUUID(),
        userId: 'Noah',
        text: "I'm looking for some help with a new feature. Any ideas?",
        createdAt: Date.now() - 75000
    },
    {
        id: crypto.randomUUID(),
        userId: 'Ava',
        text: "I might be able to help, Noah. What's the problem?",
        createdAt: Date.now() - 40000
    },
    {
        id: crypto.randomUUID(),
        userId: 'Ethan',
        text: "Good to see you all. I've been working on a new design concept.",
        createdAt: Date.now() - 15000
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
