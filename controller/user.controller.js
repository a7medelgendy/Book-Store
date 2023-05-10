const queries = require('../db/queries');
const dbConnection = require('../db/connection');
const util = require('../util/utility');
const Logger = require('../services/logger.service');
const auditService = require('../audit/audit.service');
const auditAction = require('../audit/auditAction');
const bcrypt = require('bcrypt');
const userService = require("../services/user.service")

const logger = new Logger('user.controller');

exports.getUserList = async (req, res) => {
    var auditOn = util.dateFormat();
    try {
        var userListQuery = queries.queryList.GET_USER_LIST_QUERY;
        var result = await dbConnection.dbQuery(userListQuery);
        logger.info("return user List", result.rows);
        auditService.prepareAudit(auditAction.actionList.GET_USER_LIST, result.rows, null, "postman", auditOn);
        return res.status(200).send(JSON.stringify(result.rows));
    } catch (err) {
        console.log("Error : " + err);
        let errorMessage = 'Failed to get users : ' + err;
        auditService.prepareAudit(auditAction.actionList.GET_USER_LIST, null, JSON.stringify(errorMessage), "postman", auditOn);
        return res.status(500).send({ error: 'Failed to get users' });
    }
}

exports.saveUser = async (req, res) => {

    try {

        var createdBy = "admin";
        var createdOn = new Date();
        // req.body
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var fullname = req.body.fullname;
        var userTypeCode = req.body.userTypeCode;
        // list groups added to user
        var groups = req.body.groups;

        if (!username || !password || !email || !fullname || !userTypeCode || !groups) {
            return res.status(500).send({ error: 'username , password , email , fullname , userTypeCode , selected groups are required , can not empty' })
        }

        /** 
         *  Validation
         *   1- username or email not exist  
         *   2- is email 
         *   3- validate password strength 
         * */

        dataToValidate = {
            "username": username,
            "email": email,
            "password": password
        }
        const validationError = await userService.validateUser(dataToValidate);
        if (validationError) {
            return res.status(500).send({ error: validationError });
        }
        /* var isUserExistsQuery = queries.queryList.IS_USER_EXISTS_QUERY;
        var result = await dbConnection.dbQuery(isUserExistsQuery, [username, email]);
        //console.log("Result : " + JSON.stringify(result))
        if (result.rows[0].count != "0") {
            return res.status(500).send({ error: 'User already Exists' })
        }

        if (!validationUtil.isValidEmail(email)) {
            return res.status(500).send({ error: 'Email is not valid' })
        }

        if (!validationUtil.isValidPassword(password)) {
            return res.status(500).send({ error: 'Password is not valid' })
        }
 */
        // everything is OK
        var hashedPassword = await bcrypt.hash(password, 10);
        values = [username, hashedPassword, email, userTypeCode, fullname, createdOn, createdBy];
        var saveUserQuery = queries.queryList.SAVE_USER_QUERY;
        await dbConnection.dbQuery(saveUserQuery, values);
        auditService.prepareAudit(auditAction.actionList.ADD_NEW_USER, result.rows, null, "postman", auditOn);
        return res.status(201).send("Successfully adding new user ");
    } catch (err) {
        console.log("Error : " + err);
        auditService.prepareAudit(auditAction.actionList.ADD_NEW_USER, null, JSON.stringify(errorMessage), "postman", auditOn);
        return res.status(500).send({ error: 'Failed to add new user' });
    }
}