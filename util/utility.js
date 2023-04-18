const randomString = require("randomstring");


/* const getStoreCode = () => {
    return randomString.generate({
        length: 8,
        charset: 'alphanumeric',
        capitalization: 'uppercase'
    })
};

module.exports = getStoreCode; */

exports.getStoreCode = () => {
    return randomString.generate({
        length: 8,
        charset: 'alphanumeric',
        capitalization: 'uppercase'
    })
};

exports.dateFormat = () => {
    return new Date(Date.now()).toLocaleString();
}