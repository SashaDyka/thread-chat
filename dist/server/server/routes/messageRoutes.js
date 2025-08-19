"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = void 0;
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/messageController");
const router = express_1.default.Router();
exports.messageRouter = router;
const messageController = new messageController_1.MessageController();
router.get('/', (req, res) => messageController.getAllMessages(req, res));
router.get('/:id', (req, res) => messageController.getMessageById(req, res));
router.post('/', (req, res) => messageController.createMessage(req, res));
router.put('/:id', (req, res) => messageController.updateMessage(req, res));
router.delete('/:id', (req, res) => messageController.deleteMessage(req, res));
