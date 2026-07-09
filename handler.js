const { plugins } = require("./lib/loader")
const { getText } = require("./lib/utils")

module.exports = async (sock, msg) => {

    const text = getText(msg)

    if (!text) return

    const ctx = {
        sock,
        msg,
        text,
        chat: msg.key.remoteJid,
        sender: msg.key.participant || msg.key.remoteJid
    }

    for (const plugin of plugins.values()) {

        const handled = await plugin.execute(ctx)

        if (handled) return

    }

}