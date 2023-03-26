const productService = require('../services/product/product_service');
const categoryService = require('../services/product/category_service');
const optionService = require('../services/product/options_service');
const vendorService = require('../services/product/vendor_service');
const priceService = require('../services/product/price_service');


const getProduct = async function (req, res, next) {

    try {

        res.json(await productService.getProduct(req.params.id));
    } catch (err) {
        err["message"] = 'Error while retriving product: ' + err.message;

        next(err);
    }
}


const addProduct = async function (req, res, next) {

    try {

        res.json(await productService.addProduct(req.body));
    } catch (err) {
        err["message"] = 'Error while adding product: ' + err.message;

        next(err);
    }
}


const updateProduct = async function (req, res, next) {

    try {

        res.json(await productService.updateProduct(req.params.id, req.body));
    } catch (err) {
        err["message"] = 'Error while updating product: ' + err.message;

        next(err);
    }
}

const deleteProduct = async function (req, res, next) {

    try {

        res.json(await productService.deleteProduct(req.params.id));
    } catch (err) {
        err["message"] = 'Error while deleting product: ' + err.message;

        next(err);
    }
}

const getCategory = async function (req, res, next) {

    try {

        res.json(await categoryService.getCategory(req.params.id));
    } catch (err) {
        err["message"] = 'Error while retriving category: ' + err.message;

        next(err);
    }
}


const addCategory = async function (req, res, next) {

    try {

        res.json(await categoryService.addCategory(req.body));
    } catch (err) {
        err["message"] = 'Error while adding category: ' + err.message;

        next(err);
    }
}


const updateCategory = async function (req, res, next) {

    try {

        res.json(await categoryService.updateCategory(req.params.id, req.body));
    } catch (err) {
        err["message"] = 'Error while updating category: ' + err.message;

        next(err);
    }
}

const deleteCategory = async function (req, res, next) {

    try {

        res.json(await categoryService.deleteCategory(req.params.id));
    } catch (err) {
        err["message"] = 'Error while deleting category: ' + err.message;

        next(err);
    }
}

const getProductOptions = async function (req, res, next) {

    try {

        res.json(await optionService.getProductOptions(req.params.id));
    } catch (err) {
        err["message"] = 'Error while retriving product option: ' + err.message;

        next(err);
    }
}


const addProductOptions = async function (req, res, next) {

    try {

        res.json(await optionService.addProductOptions(req.body));
    } catch (err) {
        err["message"] = 'Error while adding product option: ' + err.message;

        next(err);
    }
}


const updateProductOptions = async function (req, res, next) {

    try {

        res.json(await optionService.updateProductOptions(req.params.id, req.body));
    } catch (err) {
        err["message"] = 'Error while updating product option: ' + err.message;

        next(err);
    }
}

const deleteProductOptions = async function (req, res, next) {

    try {

        res.json(await optionService.deleteProductOptions(req.params.id));
    } catch (err) {
        err["message"] = 'Error while deleting product option: ' + err.message;

        next(err);
    }
}

const getProductOptionImages = async function (req, res, next) {

    try {

        res.json(await optionService.getProductOptionImages(req.params.id));
    } catch (err) {
        err["message"] = 'Error while retriving product option images: ' + err.message;

        next(err);
    }
}


const addProductOptionImages = async function (req, res, next) {

    try {

        res.json(await optionService.addProductOptionImages(req.body));
    } catch (err) {
        err["message"] = 'Error while adding product option images: ' + err.message;

        next(err);
    }
}


const updateProductOptionImages = async function (req, res, next) {

    try {

        res.json(await optionService.updateProductOptionImages(req.params.id, req.body));
    } catch (err) {
        err["message"] = 'Error while updating product option images: ' + err.message;

        next(err);
    }
}

const deleteProductOptionImages = async function (req, res, next) {

    try {

        res.json(await optionService.deleteProductOptionImages(req.params.id));
    } catch (err) {
        err["message"] = 'Error while deleting product option images: ' + err.message;

        next(err);
    }
}

const getProductInventory = async function (req, res, next) {

    try {

        res.json(await vendorService.getProductInventory(req.params.id));
    } catch (err) {
        err["message"] = 'Error while retriving product inventory: ' + err.message;

        next(err);
    }
}


const addProductInventory = async function (req, res, next) {

    try {

        res.json(await vendorService.addProductInventory(req.body));
    } catch (err) {
        err["message"] = 'Error while adding product inventory: ' + err.message;

        next(err);
    }
}


const updateProductInventory = async function (req, res, next) {

    try {

        res.json(await vendorService.updateProductInventory(req.params.id, req.body));
    } catch (err) {
        err["message"] = 'Error while updating product inventory: ' + err.message;

        next(err);
    }
}

const deleteProductInventory = async function (req, res, next) {

    try {

        res.json(await vendorService.deleteProductInventory(req.params.id));
    } catch (err) {
        err["message"] = 'Error while deleting product inventory: ' + err.message;

        next(err);
    }
}

const getVendorProductInventory = async function (req, res, next) {

    try {

        res.json(await vendorService.getVendorProductInventory(req.params.id));
    } catch (err) {
        err["message"] = 'Error while retriving vendor product inventory: ' + err.message;

        next(err);
    }
}


const addVendorProductInventory = async function (req, res, next) {

    try {

        res.json(await vendorService.addVendorProductInventory(req.body));
    } catch (err) {
        err["message"] = 'Error while adding vendor product inventory: ' + err.message;

        next(err);
    }
}


const updateVendorProductInventory = async function (req, res, next) {

    try {

        res.json(await vendorService.updateVendorProductInventory(req.params.id, req.body));
    } catch (err) {
        err["message"] = 'Error while updating vendor product inventory: ' + err.message;

        next(err);
    }
}

const deleteVendorProductInventory = async function (req, res, next) {

    try {

        res.json(await vendorService.deleteVendorProductInventory(req.params.id));
    } catch (err) {
        err["message"] = 'Error while deleting vendor product inventory: ' + err.message;

        next(err);
    }
}

const getProductPrice = async function (req, res, next) {

    try {

        res.json(await priceService.getProductPrice(req.params.id));
    } catch (err) {
        err["message"] = 'Error while retriving product price: ' + err.message;

        next(err);
    }
}


const addProductPrice = async function (req, res, next) {

    try {

        res.json(await priceService.addProductPrice(req.body));
    } catch (err) {
        err["message"] = 'Error while adding product price: ' + err.message;

        next(err);
    }
}


const updateProductPrice = async function (req, res, next) {

    try {

        res.json(await priceService.updateProductPrice(req.params.id, req.body));
    } catch (err) {
        err["message"] = 'Error while updating product price: ' + err.message;

        next(err);
    }
}

const deleteProductPrice = async function (req, res, next) {

    try {

        res.json(await priceService.deleteProductPrice(req.params.id));
    } catch (err) {
        err["message"] = 'Error while deleting product price: ' + err.message;

        next(err);
    }
}

const getProductDiscount = async function (req, res, next) {

    try {

        res.json(await priceService.getProductDiscount(req.params.id));
    } catch (err) {
        err["message"] = 'Error while retriving product discount: ' + err.message;

        next(err);
    }
}


const addProductDiscount = async function (req, res, next) {

    try {

        res.json(await priceService.addProductDiscount(req.body));
    } catch (err) {
        err["message"] = 'Error while adding product discount: ' + err.message;

        next(err);
    }
}


const updateProductDiscount = async function (req, res, next) {

    try {

        res.json(await priceService.updateProductDiscount(req.params.id, req.body));
    } catch (err) {
        err["message"] = 'Error while updating product discount: ' + err.message;

        next(err);
    }
}

const deleteProductDiscount = async function (req, res, next) {

    try {

        res.json(await priceService.deleteProductDiscount(req.params.id));
    } catch (err) {
        err["message"] = 'Error while deleting product discount: ' + err.message;

        next(err);
    }
}



module.exports = {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    getProductOptions,
    addProductOptions,
    updateProductOptions,
    deleteProductOptions,
    getProductOptionImages,
    addProductOptionImages,
    updateProductOptionImages,
    deleteProductOptionImages,
    getProductInventory,
    addProductInventory,
    updateProductInventory,
    deleteProductInventory,
    getVendorProductInventory,
    addVendorProductInventory,
    updateVendorProductInventory,
    deleteVendorProductInventory,
    getProductPrice,
    addProductPrice,
    updateProductPrice,
    deleteProductPrice,
    getProductDiscount,
    addProductDiscount,
    updateProductDiscount,
    deleteProductDiscount
}