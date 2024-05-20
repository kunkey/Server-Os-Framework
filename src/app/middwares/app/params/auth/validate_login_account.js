const { make, register, Password, setTranslationObject } = require("simple-body-validator");

module.exports = function (params) {
    // custom field => username
    register(
        'username',
        function (param) {
            return param.match(/^[A-Za-z0-9_.]+$/)
        }
    );

    return make(params, {
        username: ['required', 'username', 'min:5', 'max:20'],
        password: [
            'required',
            Password.create()
                .min(8)
                .mixedCase()
                .numbers(1),
            'max:100'
        ],
    });
};