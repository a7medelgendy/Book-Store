var generator = require("../util/generator.js");
var memStorage = require("../util/memory.storage.js");
var model = require("../model/noteModel.js");

//var getStoreCode = require('../util/utility.js')

exports.getAllNotes = (req, res) => {
  //console.log(getStoreCode());
  //console.log(generators.generatorqq.generate());
  /*   var seqID_1 = generator.generate();
    var seqID_2 = generator.generate();
    //memStorage.store.clear();
    memStorage.store.setItem(seqID_1, "1st Note");
    memStorage.store.setItem(seqID_2, "2nd Note");
  
    var keys = memStorage.getKeys();
    var values = memStorage.getValues();
  
    var noteModel = model.noteModel;
    var noteObj = new noteModel(seqID_1, 'ccc', 'dddd', new Date());
  
    console.log(JSON.stringify(values));
    res.send("WELCOME CONTROLLERS......" + JSON.stringify(noteObj)); */

  var values = memStorage.getValues();
  var keys = memStorage.getKeys();
  return res.send("WELCOME all notes......" + JSON.stringify(values));
};

exports.saveNote = (req, res) => {
  var seqID = generator.generate();
  var title = req.body.title;
  var content = req.body.content;
  var createdBy = "admin";

  if (!title || !content) {
    return res.status(500).send("data required");
  }

  var noteModel = model.noteModel;
  var noteObj = new noteModel(seqID, 'ccc', 'dddd', new Date(), createdBy);
  memStorage.store.setItem(seqID, noteObj);
  return res.status(200).send("save note succeffly");
}

exports.updateNote = (req, res) => {

  var title = req.body.title;
  var content = req.body.content;
  var createdBy = "admin";
  //diffrent with save
  var noteId = req.body.noteId;
  if (!noteId) {
    return res.status(500).send('there is no id ');
  }
  if (!title || !content) {
    return res.status(500).send("data required");
  }

  var noteModel = model.noteModel;
  var noteObj = new noteModel(noteId, 'ccc', 'dddd', new Date(), createdBy);
  memStorage.store.setItem(noteId, noteObj);
  return res.status(200).send("update note succeffly");

}

exports.deleteNote = (req, res) => {
  var noteId = req.params.noteId;;
  if (!noteId) {
    return res.status(500).send('there is no id ');
  }

  var noteItem = memStorage.store.getItem(noteId);
  if (!noteItem) {
    return res.status(500).send('there is no item refer to this id ');

    memStorage.store.removeItem(noteId);
  }
};