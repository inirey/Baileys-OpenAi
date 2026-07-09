const fs = require("fs")
const path = require("path")

const plugins = new Map()

function loadPlugins() {
    plugins.clear()

    const folder = path.join(__dirname, "../plugins")

    for (const file of fs.readdirSync(folder)) {

        if (!file.endsWith(".js")) continue

        const filepath = path.join(folder, file)

        delete require.cache[require.resolve(filepath)]

        const plugin = require(filepath)

        plugins.set(plugin.name, plugin)

        console.log(`✓ Plugin Loaded : ${plugin.name}`)
    }

    return plugins
}

module.exports = {
    plugins,
    loadPlugins
}