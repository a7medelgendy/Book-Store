const winston = require('winston');
const dbTransport = require('../services/transport.db');
const dotenv = require('dotenv');
dotenv.config();

const LOG_FORMAT = winston.format.printf(({ level, message, ...rest }) => {
    const meta = Object.keys(rest).length ? JSON.stringify(rest, null, 2) : '';
    return `${new Date().toLocaleString()} | [${level.toUpperCase()}] | ${message} | ${meta}`;
});

class LoggerService {
    constructor(route, logToDB) {
        this.route = route;
        this.logToDB = logToDB;
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                LOG_FORMAT

                /* form course
                format: winston.format.printf(info =>{
                    let message = `${dateFormat()} |  ${info.level.toUpperCase()} | ${info.message} | `;
                    message = info.obj ? message + `data ${JSON.stringify(info.obj)} | ` : message; 
                    return message;
                }),
                */
                //)
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: `${process.env.LOG_FILE_PATH} / ${route}.log`,
                    maxsize: 5242880, // 5MB
                    maxFiles: 100,
                }),
                new dbTransport({
                    route: this.route,
                    shouldLogToDB: this.logToDB
                }),
            ],
        });
    }

    async info(message, obj) {
        await this.logger.info(message, obj);
    }

    async error(message, obj) {
        await this.logger.error(message, obj);
    }

    async warn(message, obj) {
        await this.logger.warn(message, obj);
    }

    async debug(message, obj) {
        await this.logger.debug(message, obj);
    }
}

module.exports = LoggerService;
