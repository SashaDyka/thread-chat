var MessageView = /** @class */ (function () {
    function MessageView() {
        this.onDeleteMessage = function () { };
        this.onEditMessage = function () { };
        this.mainContent = document.getElementById('main-content');
        this.setupEventListeners();
    }
    MessageView.prototype.setupEventListeners = function () {
        var _this = this;
        this.mainContent.addEventListener('click', function (event) {
            var target = event.target;
            var messageElement = target.closest('.message');
            if (!messageElement)
                return;
            var messageId = messageElement.dataset.id;
            if (target.classList.contains('delete-btn')) {
                _this.onDeleteMessage(messageId);
            }
            if (target.classList.contains('edit-btn')) {
                _this.onEditMessage(messageId);
            }
        });
    };
    MessageView.prototype.renderNewMessage = function (message) {
        var messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.dataset.id = message.id;
        messageElement.innerHTML = "\n            <p><strong>".concat(message.userId, "</strong></p>\n            <p id=\"text-").concat(message.id, "\">").concat(message.text, "</p>\n            <small>").concat(new Date(message.createdAt).toLocaleString(), "</small>\n            <div class=\"message-actions\">\n                <button class=\"edit-btn\">Edit</button>\n                <button class=\"delete-btn\">Delete</button>\n            </div>\n        ");
        this.mainContent.appendChild(messageElement);
    };
    return MessageView;
}());
export { MessageView };
