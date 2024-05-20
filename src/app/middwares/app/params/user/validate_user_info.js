const { make, register, Password, setTranslationObject } = require("simple-body-validator");

module.exports = function (params) {
    setTranslationObject({
        en: {
            id: 'The :attribute invalid value.',
        }
    });
    // custom field => id
    register(
        'id',
        function (param) {
            if (!param || 0 === param.length) return false; 
            if (!Number(param) >> 0) return false;
            return true;
        }
    );

    return make(params, {
        id: ['required', 'id']
    });
};