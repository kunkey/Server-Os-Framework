"use strict";
const amqp = require("amqplib");

const {
    ENV_ENVIROMENT,
    RABBITMQ_HOST,
    RABBITMQ_PORT,
    RABBITMQ_USERNAME,
    RABBITMQ_PASSWORD
} = require("@Env");

class RABBITMQ {
    constructor() {
        this.connection = null;
        this.queue = (ENV_ENVIROMENT == "production") ? "taskQueue" : "taskQueueDevelop";
        this.channel = null;
        this.connect();
    }
    async connect() {
        try {
            this.connection = await amqp.connect(`amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`);
            this.channel = await this.connection.createChannel();
            await this.channel.assertQueue(this.queue);
            this.reciveData();
        } catch (err) {
            console.log(err);
            throw new Error("Connection RabittMQ failed!!!");
        }
    }
    async postData(data) {
        if (!this.connection) await this.connect();
        try {
            // eslint-disable-next-line no-undef
            this.channel.sendToQueue(this.queue, new Buffer.from(JSON.stringify(data)), { persistent: true });
        } catch (err) {
            console.error(err);
        }
    }
    async reciveData() {
        if (!this.connection) await this.connect();
        try {
            // eslint-disable-next-line no-undef
            var channel = this.channel;
            await this.channel.consume(this.queue, async function (message) {
                // serviceTask(channel, message);

            });
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = new RABBITMQ();