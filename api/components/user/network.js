const express = require('express');

const secure = require('./secure');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', function(req, res) {
  Controller.list()
    .then((list) => response.success(req, res, list, 200))
    .catch((err) => response.error(req, res, err.message, 500));
});

router.get('/:id', function(req, res) {
  Controller.get(req.params.id)
    .then((user) => response.success(req, res, user, 200))
    .catch((err) => response.error(req, res, err.message, 500));
});

router.post('/', function(req, res) {
  Controller.upsert(req.body)
    .then((user) => response.success(req, res, user, 201))
    .catch((err) => response.error(req, res, err, 500));
});

router.put('/', secure('update'), function(req, res) {

});

module.exports = router;