import type  { Message } from '../models/message';

const API_URL = 'http://localhost:3000/messages';

/*Add try/cetche */
export const getMessages = async (): Promise<Message[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Message retrieval error.');
    return response.json();
};


export const getMessageById = async (id: string): Promise<Message> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Message not found.');
    return response.json();
};


export const createMessage = async (userId: string, text: string): Promise<Message> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, text }),
    });
    if (!response.ok) throw new Error('Error creating message.');
    return response.json();
};

export const updateMessage = async (id: string, data: { userId?: string; text?: string }): Promise<Message> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Message update error.');
    return response.json();
};

export const deleteMessage = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Message deletion error.');
};












