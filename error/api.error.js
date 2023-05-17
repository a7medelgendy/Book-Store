const BaseError = require("./base.error");
const errorType = require("./error.type");


class APIError extends BaseError {
    constructor(name, httpStatusCode, description, isOperational) {
        super(name, httpStatusCode, description, isOperational)
        this.type = name;

        this.handleType();
    }

    handleType() {
        if (this.type === errorType.SQL_INJECTION_ERROR)
            // handlerError();
            console.log("send mail for hacking ");
        else
            console.log(this.type);

    }
}

module.exports = APIError