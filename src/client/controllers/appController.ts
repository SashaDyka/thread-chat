import { MessageView } from '../view/messageView';
import { ModalWindowView } from '../view/modalWindowView';
import { createMessage, getMessages, deleteMessage, updateMessage  } from '../services/api'; 
import type  { Message } from '../models/message';

export class AppController{
    private readonly messageView: MessageView;
    private readonly modalWindowView: ModalWindowView;
    private readonly openModalBtn: HTMLButtonElement;
    private editingMessageId: string | null = null;

    constructor() {
        this.messageView = new MessageView();
        this.modalWindowView = new ModalWindowView();
        this.openModalBtn = document.getElementById('open-modal-btn') as HTMLButtonElement;
        
        if (!this.openModalBtn) {
            throw new Error('Element with id "open-modal-btn" not found.');
        }

        this.setupEventListeners();
        this.loadInitialMessages();
    }

    private setupEventListeners(): void {
        this.openModalBtn.addEventListener('click', () => {
            this.modalWindowView.open();
        });

        this.modalWindowView.onClose(() => {
            this.modalWindowView.close();
            this.editingMessageId = null;
        });

        this.modalWindowView.onFormSubmit(this.handleFormSubmit);
        this.messageView.onDeleteMessage = this.handleDeleteMessage;
        this.messageView.onEditMessage = this.handleEditMessage;
    }

    private handleFormSubmit = async (event: Event): Promise<void> => {
        event.preventDefault();
        const { userId, text } = this.modalWindowView.getFormData();

        if (text.trim() === '' || userId.trim() === '') {
            alert('Print your name and text.');
            return;
        }

        try {
            if (this.editingMessageId) {
                await updateMessage(this.editingMessageId, { text });
                const messageElement = document.querySelector(`.message[data-id="${this.editingMessageId}"] #text-${this.editingMessageId}`);
                if (messageElement) {
                    messageElement.textContent = text;
                }
                this.editingMessageId = null; 
            } else {
                const newMessage: Message = await createMessage(userId, text);
                console.log('Message successfully sent:', newMessage);
                this.messageView.renderNewMessage(newMessage);
            }
            this.modalWindowView.close();
        } catch (error) {
            console.error('Error:', error);
            alert('Error: unable to process message.');
        }
    };

    private loadInitialMessages = async (): Promise<void> => {
        try {
            const messages: Message[] = await getMessages();
            messages.forEach(message => {
                this.messageView.renderNewMessage(message);
            });
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    private handleDeleteMessage = async (id: string): Promise<void> => {
        if (confirm('Are you sure you want to delete this message?')) {
            try {
                await deleteMessage(id);
                const messageElement = document.querySelector(`.message[data-id="${id}"]`);
                if (messageElement) {
                    messageElement.remove();
                }
            } catch (error) {
                console.error('Error deleting message:', error);
                alert('Error: unable to delete message.');
            }
        }
    };

    private handleEditMessage = (id: string): void => {
        this.editingMessageId = id;
        this.modalWindowView.open();
    };
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        new AppController();
    } catch (error) {
        console.error('Failed to initialize the app:', error);
    }
});
