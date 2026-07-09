module.exports = {

    name: "Menu",

    async execute(ctx) {

        const text = ctx.text.toLowerCase()

        if (
            text !== "menu" &&
            text !== "help"
        ) return false

        await ctx.reply(`
🤖 *Rinz AI*

Halo 👋

Bot berhasil online.

Ketik apa saja untuk mulai chat AI.

Saat ini tersedia:

• Menu
• Ping
• AI Chat (Coming Soon)

        `)

        return true

    }

}