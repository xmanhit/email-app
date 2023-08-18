import allMessages from "../data/messages.json";

export default class Message {
  #messages = allMessages.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  #folders;
  #currentEmail;
  #sortMessagesByFolders;

  constructor(email) {
    this.#currentEmail = email;
    this.#folders = this.#getAllFolders();
    this.#sortMessagesByFolders = this.#sortMessagesIntoFolders();
  }

  get getFolders() {
    return Array.from(new Set(this.#folders)).sort((a, b) => {
      if (a === "inbox") return -1;
      else if (a === "sent" && b !== "inbox") return -1;
      else if (a === "spam") return 1;
      else return 1;
    });
  }

  get foldersMessages() {
    return this.#sortMessagesByFolders;
  }

  getMessage(id) {
    return this.#messages.find(({ id: messageId }) => messageId === id);
  }

  #getAllFolders() {
    return this.#messages && this.#messages.length > 0
      ? this.#messages.map(({ folder }) => folder)
      : [];
  }

  #getMessagesForUser() {
    return this.#messages.filter(
      ({ from: { email: fromEmail }, to: { email: toEmail } }) =>
        fromEmail === this.#currentEmail || toEmail === this.#currentEmail
    );
  }

  #sortMessagesIntoFolders() {
    const foldersObj = this.#initializeFolders();
    for (const message of this.#getMessagesForUser()) {
      const {
        from: { email: fromEmail },
        to: { email: toEmail },
        folder,
      } = message;
      if (folder !== "sent" && toEmail === this.#currentEmail) {
        foldersObj[folder].push(message);
      }
      if (folder === "sent" && fromEmail !== this.#currentEmail) {
        foldersObj[folder].push(message);
      }
    }
    return foldersObj;
  }

  #initializeFolders() {
    const result = {};
    this.#folders.forEach((folder) => (result[folder] = []));
    return result;
  }

  /**
   * @param {string} messageId
   */
  set markMessageAsRead(messageId) {
    const messageIndex = this.#messages.findIndex(({ id }) => id === messageId);
    if (messageIndex > -1) {
      this.#messages[messageIndex].unread = false;
    }
  }
}
