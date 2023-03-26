const router = require('express').Router();
const errorMiddleware = require('../middlewares/db_error');
const customerController = require('../controllers/customer_controller');

//------------------CUSTOMER SERVICE
router.post('/customer/addCustomer',customerController.addCustomer,errorMiddleware.dbError);
router.get('/customer/getCustomer/:id',customerController.getCustomer,errorMiddleware.dbError);
router.put('/customer/updateCustomer/:id',customerController.updateCustomer,errorMiddleware.dbError);
router.put('/customer/deleteCustomer/:id',customerController.deleteCustomer,errorMiddleware.dbError);
router.post('/customer/addPassword/:id',customerController.addCustomerPassword,errorMiddleware.dbError);

//-------------------LOGIN SERVICE

router.post('/customer/loginEmail',customerController.customerLoginWithEmail,errorMiddleware.dbError);
router.get('/customer/loginPassword/:id',customerController.showCustomerLoginPasswordPage,errorMiddleware.dbError);
router.post('/customer/loginPassword/:id',customerController.customerLoginPassword,errorMiddleware.dbError);

//-------------------ADDRESS SERVICE

router.get('/customer/getAddress/:id',customerController.getCustomerAddress,errorMiddleware.dbError);
router.post('/customer/addAddress/:id',customerController.addCustomerAddress,errorMiddleware.dbError);
router.post('/customer/deleteAddress/:id',customerController.deleteCustomerAddress,errorMiddleware.dbError);

//-------------------PAYMENT INFO SERVICE

router.get('/customer/getPaymentInfo/:id',customerController.getCustomerPaymentInfo,errorMiddleware.dbError);
router.post('/customer/addPaymentInfo/:id',customerController.addCustomerPaymentInfo,errorMiddleware.dbError);
router.post('/customer/deletePaymentInfo/:id',customerController.deleteCustomerPaymentInfo,errorMiddleware.dbError);


module.exports = router