const queries = require('../db/queries');
const dbConnection = require('../db/connection');
const validationUtil = require('../Util/validation');

exports.validateUser = async ({ username, email, password }) => {
    /** 
            *  Validation
            *   1- username or email not exist  
            *   2- is email 
            *   3- validate password strength 
            * */

    var isUserExistsQuery = queries.queryList.IS_USER_EXISTS_QUERY;
    var result = await dbConnection.dbQuery(isUserExistsQuery, [username, email]);
    // console.log("Result : " + JSON.stringify(result))
    if (result.rows[0].count != "0") {
        return 'User already Exists'
    }


    if (!validationUtil.isValidEmail(email)) {
        return 'Email is not valid'
    }

    if (!validationUtil.isValidPassword(password)) {
        return 'Password is not valid';
    }

    return null;
}