module.exports = {

    name: "Ping",

    async execute(ctx) {

        if (ctx.text.toLowerCase() !== "ping")
            return false

        await ctx.react("🏓")

        await ctx.reply("Pong!")

        return true

    }

}