var express = require('express');
var router = express.Router();
const parcelController=require('../controllers/parcelController');
/* GET users listing. */
router.get('/add', parcelController.add);
router.get('/all_parcels', parcelController.all_parcels);
router.post('/add', parcelController.add_post);

module.exports = router;