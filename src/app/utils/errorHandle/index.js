

process.on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
});
process.on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
});