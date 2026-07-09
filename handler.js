const { plugins } = require("./lib/loader")
const { getText } = require("./lib/utils")
const createContext = require("./lib/context")

module.exports = async (sock, msg) => {

    const text = getText(msg)

    if (!text) return

    const ctx = createContext(sock, msg, text)

    for (const plugin of plugins.values()) {

        try {

            const handled = await plugin.execute(ctx)

            if (handled) return

        } catch (e) {
            console.log(e)
        }

    }

}