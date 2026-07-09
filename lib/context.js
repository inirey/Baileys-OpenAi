const config = require("../config")

module.exports = function createContext(sock, msg, text) {

    const chat = msg.key.remoteJid
    const sender = msg.key.participant || chat

    return {

        sock,
        msg,
        text,
        chat,
        sender,

        isGroup: chat.endsWith("@g.us"),

        isOwner: sender.startsWith(config.owner.number),

        async reply(text, options = {}) {
            return await sock.sendMessage(chat, {
                text,
                ...options
            }, {
                quoted: msg
            })
        },

        async react(emoji) {
            return await sock.sendMessage(chat, {
                react: {
                    text: emoji,
                    key: msg.key
                }
            })
        }

    }

}
``