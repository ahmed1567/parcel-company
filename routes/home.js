var express = require('express');
var router = express.Router();
const homeController=require('../controllers/homeController');


/* GET home page. */
router.get('/', homeController.home) 
router.get('/admin', homeController.admin) 
router.post('/admin', homeController.admin_post) 

module.exports = router;
