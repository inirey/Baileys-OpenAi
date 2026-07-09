const fs = require("fs")
const path = require("path")

const plugins = []

function loadPlugins() {
    plugins.length = 0

    const folder = path.join(__dirname, "../plugins")

    const files = fs.readdirSync(folder).filter(file => file.endsWith(".js"))

    for (const file of files) {

        const filepath = path.join(folder, file)

        delete require.cache[require.resolve(filepath)]

        const plugin = require(filepath)

        plugins.push(plugin)

        console.log(`[PLUGIN] ${plugin.name} Loaded`)
    }

    return plugins
}

module.exports = {
    plugins,
    loadPlugins
}