module.exports = {

    name: "menu",

    async execute({ sock, msg, text }) {

        const q = text.toLowerCase()

        if (
            q !== "menu" &&
            q !== "help" &&
            q !== "bantuan"
        ) return false

        await sock.sendMessage(msg.key.remoteJid, {
            text: `
🤖 Rinz AI

• Chat AI
• Sticker
• Image
• Group
• Owner

Ketik apa saja untuk ngobrol.
            `.trim()
        })

        return true

    }

}