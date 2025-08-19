var ModalWindowView = /** @class */ (function () {
    function ModalWindowView() {
        this.modal = document.getElementById('modal');
        this.createMessageForm = document.getElementById('create-message-form');
        this.userIdInput = document.getElementById('modal-user-id');
        this.textInput = document.getElementById('modal-text');
        this.closeModalBtn = document.getElementById('close-modal-btn');
        this.sendButton = document.getElementById('modal-btn-send');
        if (!this.modal || !this.createMessageForm || !this.userIdInput || !this.textInput || !this.closeModalBtn) {
            throw new Error('Required modal elements not found in the DOM.');
        }
    }
    ModalWindowView.prototype.getFormData = function () {
        return {
            userId: this.userIdInput.value,
            text: this.textInput.value,
        };
    };
    ModalWindowView.prototype.open = function () {
        this.modal.style.display = 'flex';
    };
    ModalWindowView.prototype.close = function () {
        this.modal.style.display = 'none';
        this.createMessageForm.reset();
    };
    ModalWindowView.prototype.onFormSubmit = function (handler) {
        this.createMessageForm.addEventListener('submit', handler);
    };
    ModalWindowView.prototype.onClose = function (handler) {
        this.closeModalBtn.addEventListener('click', handler);
    };
    return ModalWindowView;
}());
export { ModalWindowView };
