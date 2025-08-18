import type { Request, Response } from 'express';
import { MessageDB } from '../data/messageDB';
import type { Message } from '../../client/models/message';
import crypto from 'crypto';

const messageDB = new MessageDB();

export class MessageController {
     public getAllMessages(req: Request, res: Response): void {
        const messages = messageDB.getAllMessages();
        res.status(200).json(messages);
    }

    public getMessageById(req: Request, res: Response): void {
        const { id } = req.params;
        if (id === undefined) {
            res.status(400).json({ error: 'Message ID not provided.' });
            return;
        }
        const message = messageDB.getMessageById(id);

        if (message) {
            res.status(200).json(message);
        } else {
            res.status(404).json({ error: 'Message not found.' });
        }
    }


    public createMessage(req: Request, res: Response): void {
        const { userId, text } = req.body;

        if (!userId || !text) {
            res.status(400).json({ error: 'Please provide userId and text.' });
            return;
        }

        const newMessage: Message = {
            id: crypto.randomUUID(),
            userId,
            text,
            createdAt: Date.now()
        };

        messageDB.createMessage(newMessage);
        res.status(201).json(newMessage);
    }


    public updateMessage(req: Request, res: Response): void {
        const { id } = req.params;
        const { userId, text } = req.body;
        if (id === undefined) {
            res.status(400).json({ error: 'Message ID not provided.' });
            return;
        }

        const updatedMessage = messageDB.updateMessage(id, { userId, text });

        if (updatedMessage) {
            res.status(200).json(updatedMessage);
        } else {
            res.status(404).json({ error: 'Message not found or not updated.' });
        }
    }


    public deleteMessage(req: Request, res: Response): void {
        const { id } = req.params;
        if (id === undefined) {
            res.status(400).json({ error: 'Message ID not provided.' });
            return;
        }
        
        const success = messageDB.deleteMessage(id);

        if (success) {
            res.status(204).send(); 
        } else {
            res.status(404).json({ error: 'Message not found.' });
        }
    }
}