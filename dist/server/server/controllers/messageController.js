"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const messageDB_1 = require("../data/messageDB");
const crypto_1 = __importDefault(require("crypto"));
const messageDB = new messageDB_1.MessageDB();
class MessageController {
    getAllMessages(req, res) {
        const messages = messageDB.getAllMessages();
        res.status(200).json(messages);
    }
    getMessageById(req, res) {
        const { id } = req.params;
        if (id === undefined) {
            res.status(400).json({ error: 'Message ID not provided.' });
            return;
        }
        const message = messageDB.getMessageById(id);
        if (message) {
            res.status(200).json(message);
        }
        else {
            res.status(404).json({ error: 'Message not found.' });
        }
    }
    createMessage(req, res) {
        const { userId, text } = req.body;
        if (!userId || !text) {
            res.status(400).json({ error: 'Please provide userId and text.' });
            return;
        }
        const newMessage = {
            id: crypto_1.default.randomUUID(),
            userId,
            text,
            createdAt: Date.now()
        };
        messageDB.createMessage(newMessage);
        res.status(201).json(newMessage);
    }
    updateMessage(req, res) {
        const { id } = req.params;
        const { userId, text } = req.body;
        if (id === undefined) {
            res.status(400).json({ error: 'Message ID not provided.' });
            return;
        }
        const updatedMessage = messageDB.updateMessage(id, { userId, text });
        if (updatedMessage) {
            res.status(200).json(updatedMessage);
        }
        else {
            res.status(404).json({ error: 'Message not found or not updated.' });
        }
    }
    deleteMessage(req, res) {
        const { id } = req.params;
        if (id === undefined) {
            res.status(400).json({ error: 'Message ID not provided.' });
            return;
        }
        const success = messageDB.deleteMessage(id);
        if (success) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'Message not found.' });
        }
    }
}
exports.MessageController = MessageController;
