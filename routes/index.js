const express = require('express');
const router = express.Router();
const controllerJogo = require('../controller');


router.get('/', function(req, res, next) {
  res.render('index.mst');
});

router.get('/jogar', function(req, res, next) {
  controllerJogo.play(req, res);
});

router.get('/rodada', function(req, res, next) {
 
  var idResp = req.query.id;
  controllerJogo.correcao(idResp, req, res);

});

router.get('/fim', function(req, res, next) {
  
  var pontos = 3;
  res.render('index.mst', {"fim": true, "pontos": pontos}); 
});

module.exports = router;
