const { make, register, Password, setTranslationObject } = require("simple-body-validator");

module.exports = function (params) {
    setTranslationObject({
        en: {
            name: 'The :attribute cannot contain strange characters.',
            username: 'The :attribute cannot contain strange characters.',
            phone: 'The :attribute invalid.',
        }
    });

    // custom field => name
    register(
        'name',
        function (param) {
            return param.match(/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/)
        }
    );
    // custom field => username
    register(
        'username',
        function (param) {
            return param.match(/^[A-Za-z0-9_.]+$/)
        }
    );
    // custom field => phone
    register('phone', function (param) {
        return /^[\+]?(?:[(][0-9]{1,3}[)]|(?:84|0))[0-9]{7,10}$/im.test(param);
    });
    return make(params, {
        name: ['required', 'name', 'min:8', 'max:50'],
        username: ['required', 'username', 'min:5', 'max:20'],
        phone: ['required', 'phone', 'min:10', 'max:14'],
        email: ['required', 'email'],
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