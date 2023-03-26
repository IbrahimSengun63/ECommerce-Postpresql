const router = require('express').Router();
const errorMiddleware = require('../middlewares/db_error');
const storeController = require('../controllers/store_controller');

//------------------STORE SERVICE
router.post('/store/addStore',storeController.addStore,errorMiddleware.dbError);
router.get('/store/getStore/:id',storeController.getStore,errorMiddleware.dbError);
router.put('/store/updateStore/:id',storeController.updateStore,errorMiddleware.dbError);
router.put('/store/deleteStore/:id',storeController.deleteStore,errorMiddleware.dbError);
router.post('/store/addPassword/:id',storeController.addStorePassword,errorMiddleware.dbError);

//-------------------LOGIN SERVICE

router.post('/store/loginEmail',storeController.storeLoginWithEmail,errorMiddleware.dbError);
router.get('/store/loginPassword/:id',storeController.showStoreLoginPasswordPage,errorMiddleware.dbError);
router.post('/store/loginPassword/:id',storeController.storeLoginPassword,errorMiddleware.dbError);

//-------------------ADDRESS SERVICE

router.get('/store/getAddress/:id',storeController.getStoreAddress,errorMiddleware.dbError);
router.post('/store/addAddress/:id',storeController.addStoreAddress,errorMiddleware.dbError);
router.post('/store/deleteAddress/:id',storeController.deleteStoreAddress,errorMiddleware.dbError);

//-------------------PAYMENT INFO SERVICE

router.get('/store/getPaymentInfo/:id',storeController.getStorePaymentInfo,errorMiddleware.dbError);
router.post('/store/addPaymentInfo/:id',storeController.addStorePaymentInfo,errorMiddleware.dbError);
router.post('/store/deletePaymentInfo/:id',storeController.deleteStorePaymentInfo,errorMiddleware.dbError);


module.exports = router