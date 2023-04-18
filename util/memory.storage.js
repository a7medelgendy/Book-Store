var MemoryStorage = require('memorystorage');
// here, the MemoryStorage function is available
var store = new MemoryStorage('notes-app');


exports.getKeys = () => {
    var keys = [];
    for (var i = 0; i < store.length; i++) {
        var key = store.key(i);
        keys.push(key);
    }
    return keys;
}

exports.getValues = () => {
    var values = [];
    for (var i = 1; i <= store.length; i++) {
        var value = store.getItem(i);
        values.push(value);
    }
    return values;
}

exports.store = store;