module.exports = {

    name: "ping",

    async execute({ sock, msg, text }) {

        if (text.toLowerCase() !== "ping")
            return false

        await sock.sendMessage(msg.key.remoteJid, {
            text: "🏓 Pong!"
        })

        return true

    }

}