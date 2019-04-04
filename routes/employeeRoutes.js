var express = require('express');
var router = express.Router();
var employeeController = require('../controllers/employeeController.js');

router.get('/', employeeController.list);

router.get('/new', employeeController.new);

router.get('/show/:id', employeeController.show);

router.post('/', employeeController.create);

router.get('/edit/:id', employeeController.edit);

router.post('/update/:id', employeeController.update);

router.post('/delete/:id', employeeController.remove);

module.exports = router;
