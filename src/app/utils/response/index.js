


module.exports = {
    ERROR: function (errCode = null, errMessage = null, errorData = null) {
        return {
            error_code: errCode, error_message: errMessage, error_data: errorData
        }
    },
    SUCCESS: function (dataResp = {}, errMessage = null) {
        return {
            error_code: 0, error_message: errMessage, data: dataResp
        }
    }
}