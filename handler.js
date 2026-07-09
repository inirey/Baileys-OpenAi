const { plugins } = require("./lib/loader")
const createContext = require("./lib/context")
const { getText } = require("./lib/utils")

module.exports = async (sock, msg) => {

    const text = getText(msg)

    if (!text) return

    const ctx = createContext(sock, msg, text)

    for (const plugin of plugins) {

        try {

            const handled = await plugin.execute(ctx)

            if (handled) return

        } catch (e) {

            console.log(e)

        }

    }

}