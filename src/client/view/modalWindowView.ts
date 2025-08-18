export class ModalWindowView {
    private readonly modal: HTMLElement;
    private readonly createMessageForm: HTMLFormElement;
    private readonly userIdInput: HTMLInputElement;
    private readonly textInput: HTMLTextAreaElement;
    private readonly closeModalBtn: HTMLButtonElement;
    private readonly sendButton: HTMLButtonElement; 

    constructor() {
        this.modal = document.getElementById('modal') as HTMLElement;
        this.createMessageForm = document.getElementById('create-message-form') as HTMLFormElement;
        this.userIdInput = document.getElementById('modal-user-id') as HTMLInputElement;
        this.textInput = document.getElementById('modal-text') as HTMLTextAreaElement;
        this.closeModalBtn = document.getElementById('close-modal-btn') as HTMLButtonElement;
        this.sendButton = document.getElementById('modal-btn-send') as HTMLButtonElement;

        if (!this.modal || !this.createMessageForm || !this.userIdInput || !this.textInput || !this.closeModalBtn) {
            throw new Error('Required modal elements not found in the DOM.');
        }
    }


    public getFormData(): { userId: string; text: string } {
        return {
            userId: this.userIdInput.value,
            text: this.textInput.value,
        };
    }

    public open(): void {
        this.modal.style.display = 'flex';
    }

    
    public close(): void {
        this.modal.style.display = 'none';
        this.createMessageForm.reset();
    }


    public onFormSubmit(handler: (event: Event) => void): void {
        this.createMessageForm.addEventListener('submit', handler);
    }


    public onClose(handler: () => void): void {
        this.closeModalBtn.addEventListener('click', handler);
    }
}