const router = require('express').Router();
const errorMiddleware = require('../middlewares/db_error');
const publicController = require('../controllers/public_controller');

router.get('/getAddresses',publicController.getAddresses,errorMiddleware.dbError);



module.exports = router