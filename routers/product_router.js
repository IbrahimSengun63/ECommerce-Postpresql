const router = require('express').Router();
const errorMiddleware = require('../middlewares/db_error');
const productController = require('../controllers/product_controller');

//-------------- PRODUCT SERVICE

router.get('/product/getProduct/:id', productController.getProduct, errorMiddleware.dbError);
router.post('/product/addProduct', productController.addProduct, errorMiddleware.dbError);
router.post('/product/updateProduct/:id', productController.updateProduct, errorMiddleware.dbError);
router.post('/product/deleteProduct/:id', productController.deleteProduct, errorMiddleware.dbError);

//-------------- CATEGORY SERVICE

router.get('/product/getCategory/:id', productController.getCategory, errorMiddleware.dbError);
router.post('/product/addCategory', productController.addCategory, errorMiddleware.dbError);
router.post('/product/updateCategory/:id', productController.updateCategory, errorMiddleware.dbError);
router.post('/product/deleteCategory/:id', productController.deleteCategory, errorMiddleware.dbError);

//-------------- OPTION SERVICE

router.get('/product/getProductOptions/:id', productController.getProductOptions, errorMiddleware.dbError);
router.post('/product/addProductOptions', productController.addProductOptions, errorMiddleware.dbError);
router.post('/product/updateProductOptions/:id', productController.updateProductOptions, errorMiddleware.dbError);
router.post('/product/deleteProductOptions/:id', productController.deleteProductOptions, errorMiddleware.dbError);

router.get('/product/getProductOptionImages/:id', productController.getProductOptionImages, errorMiddleware.dbError);
router.post('/product/addProductOptionImages', productController.addProductOptionImages, errorMiddleware.dbError);
router.post('/product/updateProductOptionImages/:id', productController.updateProductOptionImages, errorMiddleware.dbError);
router.post('/product/deleteProductOptionImages/:id', productController.deleteProductOptionImages, errorMiddleware.dbError);

//-------------- VENDOR SERVICE

router.get('/product/getProductInventory/:id', productController.getProductInventory, errorMiddleware.dbError);
router.post('/product/addProductInventory', productController.addProductInventory, errorMiddleware.dbError);
router.post('/product/updateProductInventory/:id', productController.updateProductInventory, errorMiddleware.dbError);
router.post('/product/deleteProductInventory/:id', productController.deleteProductInventory, errorMiddleware.dbError);

router.get('/product/getVendorProductInventory/:id', productController.getVendorProductInventory, errorMiddleware.dbError);
router.post('/product/addVendorProductInventory', productController.addVendorProductInventory, errorMiddleware.dbError);
router.post('/product/updateVendorProductInventory/:id', productController.updateVendorProductInventory, errorMiddleware.dbError);
router.post('/product/deleteVendorProductInventory/:id', productController.deleteVendorProductInventory, errorMiddleware.dbError);

//-------------- PRICE SERVICE

router.get('/product/getProductPrice/:id', productController.getProductPrice, errorMiddleware.dbError);
router.post('/product/addProductPrice', productController.addProductPrice, errorMiddleware.dbError);
router.post('/product/updateProductPrice/:id', productController.updateProductPrice, errorMiddleware.dbError);
router.post('/product/deleteProductPrice/:id', productController.deleteProductPrice, errorMiddleware.dbError);

router.get('/product/getProductDiscount/:id', productController.getProductDiscount, errorMiddleware.dbError);
router.post('/product/addProductDiscount', productController.addProductDiscount, errorMiddleware.dbError);
router.post('/product/updateProductDiscount/:id', productController.updateProductDiscount, errorMiddleware.dbError);
router.post('/product/deleteProductDiscount/:id', productController.deleteProductDiscount, errorMiddleware.dbError);



module.exports = router