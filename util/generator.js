var sequential = require("sequential-ids");

var generator = new sequential.Generator({
    digits: 6,
    restore: " 0"
});

generator.start();
//exports.generatorqq = generator;
module.exports = generator;