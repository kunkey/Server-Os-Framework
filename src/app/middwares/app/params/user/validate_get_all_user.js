const { make, register, Password, setTranslationObject } = require("simple-body-validator");

module.exports = function (params) {
    setTranslationObject({
        en: {
            page: 'The :attribute invalid value.',
            limit: 'The :attribute invalid value.',
            sort: 'The :attribute invalid value.',
            name: 'The :attribute cannot contain strange characters.',
            username: 'The :attribute cannot contain strange characters.',
            phone: 'The :attribute invalid.',
        }
    });
    // custom field => page
    register(
        'page',
        function (param) {
            if (!param || 0 === param.length) return false;
            if (!Number(param) >> 0) return false;
            return true;
        }
    );
    // custom field => limit
    register(
        'limit',
        function (param) {
            if (!param || 0 === param.length) return false;
            if (!Number(param) >> 0) return false;
            return true;
        }
    );
    // custom field => sort
    register(
        'sort',
        function (param) {
            return (param.toUpperCase() == "ASC" || param.toUpperCase() == "DESC") ? true : false;
        }
    );
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
        page: ['page'],
        limit: ['limit'],
        sort: ['sort'],
        name: ['name', 'min:8', 'max:50'],
        username: ['username', 'min:5', 'max:20'],
        phone: ['phone', 'min:10', 'max:14'],
        email: ['email'],
    });
};