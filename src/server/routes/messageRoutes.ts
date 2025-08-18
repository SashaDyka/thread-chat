import express from 'express';
import { MessageController } from '../controllers/messageController';

const router = express.Router();
const messageController = new MessageController();


router.get('/', (req, res) => messageController.getAllMessages(req, res));

router.get('/:id', (req, res) => messageController.getMessageById(req, res));

router.post('/', (req, res) => messageController.createMessage(req, res));

router.put('/:id', (req, res) => messageController.updateMessage(req, res));

router.delete('/:id', (req, res) => messageController.deleteMessage(req, res));

export { router as messageRouter };
