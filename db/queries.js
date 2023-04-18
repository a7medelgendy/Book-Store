exports.queryList = {

    GET_STORE_LIST_QUERY: 'SELECT STORE_ID, STORE_NAME, STORE_CODE FROM BMS.STORE',

    SAVE_STORE_QUERY: 'INSERT INTO BMS.STORE (STORE_NAME, STORE_CODE, ADDRESS , CREATED_BY , CREATED_ON) VALUES($1, $2, $3, $4, $5)',

    GET_BOOK_LIST_QUERY: 'SELECT BOOK_ID, BOOK_TITLE, BOOK_AUTHOR, BOOK_PUBLISHER FROM BMS.BOOK',

    GET_BOOK_DETAILS_QUERY: `SELECT BOOK_ID, BOOK_TITLE, BOOK_DESCRIPTION, BOOK_AUTHOR, BOOK_PUBLISHER, BOOK_PAGES
                            , BOOK.STORE_CODE, store.store_name , store.address  FROM BMS.BOOK INNER JOIN  BMS.STORE ON BOOK.STORE_CODE  = STORE.STORE_CODE 
                            WHERE BOOK_ID =$1`,

    SAVE_BOOK_QUERY: ` INSERT INTO BMS.BOOK (BOOK_TITLE, BOOK_DESCRIPTION, BOOK_AUTHOR, BOOK_PUBLISHER, BOOK_PAGES, STORE_CODE, CREATED_BY , CREATED_ON)
                        VALUES($1, $2, $3, $4, $5 , $6 , $7 , $8) `,

    UPDATE_BOOK_QUERY: `
                    UPDATE BMS.BOOK SET BOOK_TITLE=$1, BOOK_DESCRIPTION=$2, BOOK_AUTHOR=$3, BOOK_PUBLISHER=$4, 
                    BOOK_PAGES=$5, STORE_CODE=$6, CREATED_BY=$7 , CREATED_ON=$8
                    WHERE BOOK_ID=$9
    `,

    DELETE_BOOK_QUERY: ` DELETE FROM BMS.BOOK WHERE BOOK_ID=$1 `,

    AUDIT_QUERY: `INSERT INTO BMS.APP_AUDIT (AUDIT_ACTION, AUDIT_DATA, AUDIT_STATUS, AUDIT_ERROR , AUDIT_BY, AUDIT_ON) VALUES($1, $2, $3, $4, $5, $6)
    `,

    GET_USER_LIST_QUERY: ` SELECT USER_ID, USERNAME, EMAIL, USER_TYPE_CODE, FULL_NAME, ACTIVE FROM BMS.APP_USER    `,

    IS_USER_EXISTS_QUERY: ` SELECT COUNT(USER_ID) FROM BMS.APP_USER WHERE LOWER(USERNAME) =LOWER($1) OR LOWER(EMAIL)=LOWER($2) `,

    SAVE_USER_QUERY: ` INSERT INTO BMS.APP_USER (USERNAME, PASSWORD, EMAIL, USER_TYPE_CODE, FULL_NAME, CREATED_ON, CREATED_BY) VALUES($1, $2, $3, $4, $5, $6, $7)  returning *  `,

    LOGIN_QUERY: `  SELECT USER_ID, USERNAME, PASSWORD , EMAIL, USER_TYPE_CODE, FULL_NAME, ACTIVE FROM BMS.APP_USER WHERE LOWER(USERNAME) = LOWER($1) AND ACTIVE = 1 `,




    LOG_QUERY: `INSERT INTO bms.logs (route, timestamp, level, message, meta) VALUES ($1, $2, $3, $4, $5)`,



}