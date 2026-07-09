const { chat } = require("../lib/openai")

module.exports = {
    name: "ai",

    async execute({ sock, msg, text }) {
        const reply = await chat(text)

        await sock.sendMessage(msg.key.remoteJid, {
            text: reply
        })

        return true
    }
}