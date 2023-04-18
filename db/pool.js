const { Pool } = require('pg');
const loggerSevice = require('../services/logger.service');
const dotenv = require('dotenv');
dotenv.config();

var logger = new loggerSevice('pool.js', false);
const db_config = {
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 300000,
    idleTimeoutMillis: 30000,
    max: 20, //number of concurrent user
}

const pool = new Pool(db_config);

pool.on('connect', () => {
    logger.info(`db connected, Number of connection pools: ${pool.totalCount}`);
})

pool.on('remove', () => {
    logger.warn(`db removed, Number of connection pools: ${pool.totalCount}`)
})

module.exports = pool;