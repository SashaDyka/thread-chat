import type { Message } from '../models/message';

export class MessageView{
    private readonly mainContent: HTMLElement;
    public onDeleteMessage: (id: string) => void = () => {};
    public onEditMessage: (id: string) => void = () => {};

    constructor() {
        this.mainContent = document.getElementById('main-content') as HTMLElement;
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        this.mainContent.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const messageElement = target.closest('.message') as HTMLElement;
            if (!messageElement) return;

            const messageId = messageElement.dataset.id as string;

            if (target.classList.contains('delete-btn')) {
                this.onDeleteMessage(messageId);
            }

            if (target.classList.contains('edit-btn')) {
                this.onEditMessage(messageId);
            }
        });
    }

    public renderNewMessage(message: Message): void {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.dataset.id = message.id;

        messageElement.innerHTML = `
            <p><strong>${message.userId}</strong></p>
            <p id="text-${message.id}">${message.text}</p>
            <small>${new Date(message.createdAt).toLocaleString()}</small>
            <div class="message-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        
        this.mainContent.appendChild(messageElement);
    }
}
