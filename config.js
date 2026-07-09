require("dotenv").config()

module.exports = {
    bot: {
        name: process.env.BOT_NAME || "Rinz AI",
    },

    owner: {
        name: process.env.OWNER_NAME || "Rinz",
        number: process.env.OWNER_NUMBER || ""
    },

    pairing: {
        phoneNumber: process.env.PHONE_NUMBER || ""
    },

    openai: {
        apiKey: process.env.OPENAI_API_KEY || ""
    },

    timezone: process.env.TIMEZONE || "Asia/Jakarta"
}