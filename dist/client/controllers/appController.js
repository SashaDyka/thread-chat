var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { MessageView } from '../view/messageView';
import { ModalWindowView } from '../view/modalWindowView';
import { createMessage, getMessages, deleteMessage, updateMessage } from '../services/api';
var AppController = /** @class */ (function () {
    function AppController() {
        var _this = this;
        this.editingMessageId = null;
        this.handleFormSubmit = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var _a, userId, text, messageElement, newMessage, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        event.preventDefault();
                        _a = this.modalWindowView.getFormData(), userId = _a.userId, text = _a.text;
                        if (text.trim() === '' || userId.trim() === '') {
                            alert('Print your name and text.');
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        if (!this.editingMessageId) return [3 /*break*/, 3];
                        return [4 /*yield*/, updateMessage(this.editingMessageId, { text: text })];
                    case 2:
                        _b.sent();
                        messageElement = document.querySelector(".message[data-id=\"".concat(this.editingMessageId, "\"] #text-").concat(this.editingMessageId));
                        if (messageElement) {
                            messageElement.textContent = text;
                        }
                        this.editingMessageId = null;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, createMessage(userId, text)];
                    case 4:
                        newMessage = _b.sent();
                        console.log('Message successfully sent:', newMessage);
                        this.messageView.renderNewMessage(newMessage);
                        _b.label = 5;
                    case 5:
                        this.modalWindowView.close();
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _b.sent();
                        console.error('Error:', error_1);
                        alert('Error: unable to process message.');
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.loadInitialMessages = function () { return __awaiter(_this, void 0, void 0, function () {
            var messages, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, getMessages()];
                    case 1:
                        messages = _a.sent();
                        messages.forEach(function (message) {
                            _this.messageView.renderNewMessage(message);
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Error loading messages:', error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.handleDeleteMessage = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var messageElement, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!confirm('Are you sure you want to delete this message?')) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, deleteMessage(id)];
                    case 2:
                        _a.sent();
                        messageElement = document.querySelector(".message[data-id=\"".concat(id, "\"]"));
                        if (messageElement) {
                            messageElement.remove();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error('Error deleting message:', error_3);
                        alert('Error: unable to delete message.');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.handleEditMessage = function (id) {
            _this.editingMessageId = id;
            _this.modalWindowView.open();
        };
        this.messageView = new MessageView();
        this.modalWindowView = new ModalWindowView();
        this.openModalBtn = document.getElementById('open-modal-btn');
        if (!this.openModalBtn) {
            throw new Error('Element with id "open-modal-btn" not found.');
        }
        this.setupEventListeners();
        this.loadInitialMessages();
    }
    AppController.prototype.setupEventListeners = function () {
        var _this = this;
        this.openModalBtn.addEventListener('click', function () {
            _this.modalWindowView.open();
        });
        this.modalWindowView.onClose(function () {
            _this.modalWindowView.close();
            _this.editingMessageId = null;
        });
        this.modalWindowView.onFormSubmit(this.handleFormSubmit);
        this.messageView.onDeleteMessage = this.handleDeleteMessage;
        this.messageView.onEditMessage = this.handleEditMessage;
    };
    return AppController;
}());
export { AppController };
document.addEventListener('DOMContentLoaded', function () {
    try {
        new AppController();
    }
    catch (error) {
        console.error('Failed to initialize the app:', error);
    }
});
