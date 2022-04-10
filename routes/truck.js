var express = require('express');
var router = express.Router();
const truckController=require('../controllers/truckController');
/* GET users listing. */
router.get('/add', truckController.add);
router.post('/add',truckController.add_post);

router.get('/all_trucks', truckController.all_trucks);
router.get('/view_truck', truckController.view_truck);
router.get('/truck_driver', truckController.truck_driver);
router.post('/truck_driver', truckController.driver_sign_in);

//this route for admin and driver 
router.get('/sign_out',truckController.sign_out) ;



module.exports = router;
