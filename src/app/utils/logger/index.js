const { createLogger, format, transports } = require("winston");

const loggerConsole = createLogger({
    format: format.combine(
        format.label({ label: 'Console' }),
        format.timestamp(),
        format.prettyPrint()
    ),
    transports: [new transports.Console()],
    handleExceptions: true,
});

const expressLoggerError = createLogger({
    transports: [
        new transports.File({
            name: 'error-file',
            level: 'error',
            filename: process.cwd() + '/src/storage/app/logs/request/logsErrors.log',
            handleExceptions: true,
            json: true
        }),
        new transports.File({
            level: 'warn',
            filename: process.cwd() + '/src/storage/app/logs/request/logsWarnings.log',
            handleExceptions: true,
            json: true
        }),
        new (require('winston-daily-rotate-file'))({
            filename: `${process.cwd()}/src/storage/app/logsDate/` + `%DATE%.log`,
            handleExceptions: true,
            timestamp: new Date(),
            datePattern: 'DD-MM-YYYY',
            prepend: true,
            json: true,
            level: process.env.ENV_ENVIROMENT === 'develop' ? 'verbose' : 'info'
        })
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        // myFormat,
        format.prettyPrint()
    ),
    exitOnError: false
});

const expressLoggerInstance = {
    winstonInstance: expressLoggerError,
    requestWhitelist: ['url', 'headers', 'method', 'query', 'body'],
    responseWhitelist: ['body', 'statusCode'],
    statusLevels: true
};

module.exports = {
    loggerConsole,
    expressLoggerInstance,
    expressLoggerError
}