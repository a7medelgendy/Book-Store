const queries = require('../db/queries');
const dbConnection = require('../db/connection');
const validationUtil = require('../Util/validation');
const Logger = require('../services/logger.service');
const auditService = require('../audit/audit.service');
const auditAction = require('../audit/auditAction');
const errorStatus = require('../error/error.status');
const jwtUtil = require('../util/jwtUtil');

const logger = new Logger('login.controller');


exports.getUserProfile = async (req, res) => {
    console.log("Failed to get user  : ddddddddddddddddddddddddddd");
    var user = req.user;
    try {
        return res.status(200).send(JSON.stringify(user));
    } catch (err) {
        console.log("Failed to get user  : " + err);
        return res.status(500).send({ error: 'Failed to get user' });
    }
}

exports.signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        /** 
         *  1- validate is not empty
         *  2- get user by username
         *  3- Compare password
         *  4- get user roles  
         *  5- generate token
         */
        //1- validate is not empty
        if (!username || !password) {
            return res.status(500).send({ error: 'username , password are required , can not empty' })
        }
        //2- get user by username
        var loginQuery = queries.queryList.LOGIN_QUERY;
        var result = await dbConnection.dbQuery(loginQuery, [username]);
        var dbResponse = result.rows[0];
        if (dbResponse == null) {
            logger.info("user :  [" + username + "] not exists in db");
            return res.status(errorStatus.unauthorized).send({ error: 'Invalid username or password' });
        }
        //3- Compare password
        var isPasswordValid = validationUtil.comparePassword(password, dbResponse.password);
        if (!isPasswordValid) {
            logger.info("Invalid password");
            return res.status(errorStatus.unauthorized).send({ error: 'Invalid username or password' });
        }
        //4- get user roles  
        var userRoles = await this.getUserRoles(dbResponse.user_id, req, res);
        console.log("userRoles : " + JSON.stringify(userRoles));
        //5- generate token
        var token = jwtUtil.generateToken(dbResponse.user_id, dbResponse.username, dbResponse.email, dbResponse.FULL_NAME, userRoles, dbResponse.user_type_code);
        return res.status(200).send(JSON.stringify(token));
    } catch (err) {
        logger.error("Failed to SignIn , Invalid username or password" + JSON.stringify(err))
        return res.status(500).send({ error: 'Failed to SignIn , Invalid username or password' });
    }

}


exports.getUserRoles = async (userId) => {
    //come form database ACCORDING userId
    try {
        let roles = ["admin"];
        return roles;
    } catch (err) {

    }

}

