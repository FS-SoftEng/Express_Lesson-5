

var express = require('express');
var router = express.Router();

const mysql = require('mysql2'); 

const models = require('../models'); 

const Sequelize = require('sequelize');

const Op = Sequelize.Op; 


/* GET home page. */

router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });

});

// router.get('/actors', function(req, res, next) {
  
//   models.actor.findAll({}).then(actorsFound => {
    
//     res.render('actors', {
      
//       actors: actorsFound
//     });

//   });

// });

router.get('/actors', function(req, res, next) {
  
  models.actor.findAll({}).then(foundActors => {
    
    const mappedActors = foundActors.map(actor => ({
      ActorID: actor.actor_id,
      Name: `${actor.first_name} ${actor.last_name}`
    }));

    res.render('actors', {actors:mappedActors});

  });

});

router.get('/specificActor', function(req, res, next) {

  models.actor
  .findOne({
    where: {
      actor_id: 30
    }
  })

  .then(actor => {
    res.render('specificActor', {
      actor: actor 
    });

  });

});

router.get('/actor/:id', function(req, res, next) {

  let actorID = parseInt(req.params.id); 

  models.actor
    .findOne({
      where: {
        actor_id: actorID
      }
    })

    .then(actor => {
      res.render('specificActor', {
        actor: actor
      });

    });

});


router.post('/actor', (req, res) => {
  models.actor
    .findOrCreate({
      where: {
        first_name: req.body.first_name,
        last_name: req.body.last_name
      }
    })

    .spread(function(result, created) {

      if (created) {

        res.redirect('/actors');

      } else {

        res.send('This actor already exists!');
      }
    });

});

module.exports = router;

