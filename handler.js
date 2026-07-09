const { plugins } = require("./lib/loader")

module.exports = async (sock, msg) => {

    const text =
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        ""

    if (!text) return

    for (const plugin of plugins.values()) {

        if (await plugin.execute({ sock, msg, text })) {
            return
        }

    }

}