require("dotenv").config()

const {
    default: makeWASocket,
    DisconnectReason,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys")

const pino = require("pino")
const config = require("./config")
const handler = require("./handler")

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./session")
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        version,
        auth: state,
        logger: pino({ level: "silent" }),
        browser: ["Rinz AI", "Chrome", "1.0.0"],
        syncFullHistory: false
    })

    // Simpan session
    sock.ev.on("creds.update", saveCreds)

    // Pairing Code
    if (!sock.authState.creds.registered) {
        const code = await sock.requestPairingCode(config.pairing.phoneNumber)
        console.log("\n===================================")
        console.log("Pairing Code :", code)
        console.log("===================================\n")
    }

    // Bot berhasil online
    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update

        if (connection === "open") {
            console.log("✅ WhatsApp Connected")
        }

        if (connection === "close") {
            const reason = lastDisconnect?.error?.output?.statusCode

            if (reason !== DisconnectReason.loggedOut) {
                console.log("🔄 Reconnecting...")
                startBot()
            } else {
                console.log("❌ Session Logout")
            }
        }
    })

    // Pesan masuk
    sock.ev.on("messages.upsert", async ({ messages }) => {
        try {
            const msg = messages[0]

            if (!msg.message) return
            if (msg.key.fromMe) return

            await handler(sock, msg)

        } catch (err) {
            console.error(err)
        }
    })
}

startBot()