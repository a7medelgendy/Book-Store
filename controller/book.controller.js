const queries = require('../db/queries');
const dbConnection = require('../db/connection');
const Logger = require('../services/logger.service');
const auditService = require('../audit/audit.service');
const auditAction = require('../audit/auditAction');
const util = require('../Util/utility');

//1- intiate object from class logger
var logger = new Logger("book.controller");

exports.getBookList = async (req, res) => {
    var auditOn = util.dateFormat();

    try {
        var bookListQuery = queries.queryList.GET_BOOK_LIST_QUERY;
        var result = await dbConnection.dbQuery(bookListQuery);

        //2-using logger to console, file and database
        logger.info("return book list", result.rows);

        auditService.prepareAudit(auditAction.actionList.GET_BOOK_LIST, result.rows, null, "postman", auditOn);

        return res.status(200).send(JSON.stringify(result.rows));
    } catch (err) {
        logger.error("Error : ", err);
        return res.status(500).send({ error: `Failed to get books ${err}` });
    }
}

exports.getBookDetails = async (req, res) => {
    try {
        var bookId = req.params.bookId;

        //validation
        if (!bookId) {
            return res.status(500).send({ error: 'required feilds' })
        }
        var bookDetailsQuery = queries.queryList.GET_BOOK_DETAILS_QUERY;
        var result = await dbConnection.dbQuery(bookDetailsQuery, [bookId]);
        return res.status(200).send(JSON.stringify(result.rows[0]));
    } catch (err) {
        return res.status(500).send({ error: 'Failed to get book details' });
    }
}


exports.saveBook = async (req, res) => {

    try {
        var createdBy = "admin";
        var createdOn = new Date();
        // req.body
        var title = req.body.title;
        var description = req.body.description;
        var author = req.body.author;
        var publisher = req.body.publisher;
        var pages = req.body.pages;
        var storeCode = req.body.storeCode;

        //validation
        if (!title || !author || !publisher || !storeCode) {
            return res.status(500).send({ error: 'title , author , publisher , storeCode are required , can not empty' })
        }

        var values = [title, description, author, publisher, pages, storeCode, createdBy, createdOn];
        var saveBookQuery = queries.queryList.SAVE_BOOK_QUERY;
        await dbConnection.dbQuery(saveBookQuery, values);
        return res.status(201).send("Successfully adding new book ");
    } catch (err) {
        console.log("Error : " + err);
        return res.status(500).send({ error: 'Failed to add new book' });
    }
}

exports.updateBook = async (req, res) => {

    try {
        var createdBy = "admin";
        var createdOn = new Date();
        // req.body
        var bookId = req.body.bookId;
        var title = req.body.title;
        var description = req.body.description;
        var author = req.body.author;
        var publisher = req.body.publisher;
        var pages = req.body.pages;
        var storeCode = req.body.storeCode;

        //validation
        if (!bookId || !title || !author || !publisher || !storeCode) {
            return res.status(500).send({ error: 'title , author , publisher , storeCode are required , can not empty' })
        }

        var values = [title, description, author, publisher, pages, storeCode, createdBy, createdOn, bookId];
        var updateBookQuery = queries.queryList.UPDATE_BOOK_QUERY;
        await dbConnection.dbQuery(updateBookQuery, values);
        return res.status(200).send("Successfully update book title :" + title);
    } catch (err) {
        console.log("Error : " + err);
        return res.status(500).send({ error: 'Failed to update the book' });
    }
}

exports.deleteBook = async (req, res) => {
    try {
        var bookId = req.params.bookId;
        //validation
        if (!bookId) {
            return res.status(500).send({ error: 'required feilds' })
        }
        var deleteBookQuery = queries.queryList.DELETE_BOOK_QUERY;
        var result = await dbConnection.dbQuery(deleteBookQuery, [bookId]);
        return res.status(200).send("Successfully delete book");
    } catch (err) {
        return res.status(500).send({ error: 'Failed to delete the book' });
    }
}