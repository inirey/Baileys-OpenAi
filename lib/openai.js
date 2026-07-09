const OpenAI = require("openai")
const config = require("../config")

const client = new OpenAI({
    apiKey: config.openai.apiKey
})

async function chat(input) {
    try {
        const response = await client.responses.create({
            model: "gpt-5",
            input
        })

        return response.output_text
    } catch (err) {
        console.error(err)
        return "Maaf, terjadi kesalahan saat menghubungi AI."
    }
}

module.exports = {
    chat
}