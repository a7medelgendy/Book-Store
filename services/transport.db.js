const Transport = require('winston-transport');
const dbConnection = require("../db/connection");
const queries = require("../db/queries");


class DatabaseTransport extends Transport {
    constructor(opts) {
        super(opts);

        this.route = opts.route;
        this.shouldLogToDB = opts.shouldLogToDB ?? true;

        /* this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        }); */
    }

    async log(info, callback) {
        setImmediate(() => {
            this.emit('logged', info);
        });

        var { level, message, ...rest } = info;
        var obj = Object.keys(rest).length ? JSON.stringify(rest, null, 2) : JSON.stringify('');

        //to solve infinte loop when logs  pool.js
        if (this.shouldLogToDB) {
            dbConnection.dbQuery(queries.queryList.LOG_QUERY, [this.route, new Date(), level, message, obj])
                .then(() => {
                    callback();
                })
                .catch((err) => {
                    callback(err);
                });
        }
        /*const query = {
            text: 'INSERT INTO bms.logs (route, timestamp, level, message, meta) VALUES ($1, $2, $3, $4, $5)',
            values: [this.route, new Date(), level, message, obj],
        }; 

        await this.pool.query(query);*/

    }
}

module.exports = DatabaseTransport;
