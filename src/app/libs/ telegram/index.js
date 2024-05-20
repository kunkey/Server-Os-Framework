const axios = require('axios');

module.exports = async (chatId, message, arg = {}) => {
    try {
        if (!chatId || !message) return { status: false, msg: MESSAGE_ENUM.MISSING_AGURMENT };
        let newMessage = message;
        for (const [key, value] of Object.entries(arg)) newMessage = newMessage.replace(key, String(value));
        axios({
            method: 'get',
            url: `https://api.telegram.org/bot${config.TELEGRAM_TOKEN}/sendMessage?chat_id=${chatId}&text=${encodeURI(newMessage)}`,
            headers: {}
        }).then((response) => {
            if (response.data.ok) {
                return { status: true, msg: MESSAGE_ENUM.SUCCESS, data: response.data.result };
            } else {
                return { status: false, msg: MESSAGE_ENUM.ERROR_SOMETHING };
            }
        }).catch((error) => {
            console.log(`TeleBot: ` + error.response.data.description);
            return { status: false, msg: error.response.data.description };
        });
    } catch (e) {
        console.log(`TeleBot: ` + e);
        return { status: false, msg: e.message };
    }
};
