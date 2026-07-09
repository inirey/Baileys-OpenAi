module.exports = async (sock, msg) => {

    const text =
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        ""

    if (!text) return

    console.log("Pesan :", text)

    await sock.sendMessage(msg.key.remoteJid, {
        text: `Kamu berkata:\n${text}`
    })
}