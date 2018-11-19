var express = require('express');
var router = express.Router();

const monk = require('monk');
const url = 'localhost:3001/sfmessages';
const db = monk(url);

const collection = db.get('messages');

router.get('/', function(req, res, next) {
  collection.find()
    .then(result => {
        res.send(result)
    })
});

router.post('/', function(req, res, next){
    collection.insert({
        IntegrationId: req.body.IntegrationId,
        EntityType: req.body.EntityType,
        EntityId: req.body.EntityId,
        OperationType: req.body.OperationType
    })
      .then(resp=>{
          console.log(`POST to db: IntegrationId: ${req.body.IntegrationId}`)
          res.send(`IntID: ${req.body.IntegrationId} added to db`)
      })
})

router.delete('/', function(req, res, next){
  collection.remove()
    .then(resp=>{
        res.send("removed all")
    })
})

module.exports = router;
