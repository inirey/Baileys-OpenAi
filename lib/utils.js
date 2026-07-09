function getText(msg) {
    return (
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        msg.message?.imageMessage?.caption ||
        msg.message?.videoMessage?.caption ||
        ""
    )
}

function isOwner(sender) {
    const config = require("../config")
    return sender.startsWith(config.owner.number)
}

module.exports = {
    getText,
    isOwner
}