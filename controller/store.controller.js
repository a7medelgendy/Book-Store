const dbConction = require('../db/connection.js');
const queries = require('../db/queries');
const util = require('../util/utility.js')

exports.getStoreList = async (req, res) => {
    try {
        var result = await dbConction.dbQuery(queries.queryList.GET_STORE_LIST_QUERY);
        return res.status(200).send((result.rows))
    } catch (err) {
        console.log("Error : " + err);
        return res.status(500).send({ error: 'failed to list stores' + err });
    }
}


exports.saveStore = async (req, res) => {
    try {
        var createdBy = "admin";
        var createdOn = new Date();
        if (!req.body.storeName || !req.body.address) {
            return res.status(500).send({ error: 'required feilds' })
        }

        var storeName = req.body.storeName;
        var address = req.body.address;
        var storeCode = util.getStoreCode();
        var values = [storeName, storeCode, address, createdBy, createdOn];
        await dbConction.dbQuery(queries.queryList.SAVE_STORE_QUERY, values);
        return res.status(201).send(JSON.stringify("success"))

    } catch (err) {
        console.log("Error : " + err);
        return res.status(500).send({ error: 'failed to save stores' });
    }

}