const storeService = require('../services/store/store_service');
const loginService = require('../services/store/login_service');
const addressService = require('../services/store/address_service');
const paymentInfoService = require('../services/store/payment_service');
const bcrypt = require('bcrypt');

const addStore = async function (req, res, next) {

    try {

        res.json(await storeService.addStore(req.body));
    } catch (err) {
        err["message"] = 'Error while adding store: ' + err.message;

        next(err);
    }
}

const getStore = async function (req, res, next) {

    try {

        res.json(await storeService.getStore(req.params.id));
    } catch (err) {
        err["message"] = 'Error while retriving store: ' + err.message;

        next(err);
    }
}

const updateStore = async function (req, res, next) {

    try {

        res.json(await storeService.updateStore(req.params.id, req.body));
    } catch (err) {
        err["message"] = 'Error while updating store: ' + err.message;

        next(err);
    }
}

const deleteStore = async function (req, res, next) {

    try {

        res.json(await storeService.deleteStore(req.params.id));
    } catch (err) {
        err["message"] = 'Error while deleting store: ' + err.message;

        next(err);
    }
}

const addStorePassword = async function (req, res, next) {

    try {

        res.json(await storeService.addStorePassword(req.params.id, req.body.password));
    } catch (err) {
        err["message"] = 'Error while adding store password: ' + err.message;

        next(err);
    }
}

const storeLoginWithEmail = async function (req, res, next) {

    try {

        const id = await loginService.storeLoginWithEmail(req.body.email);
        res.redirect('/loginPassword/' + id);
    } catch (err) {
        err["message"] = 'Error while login with store email: ' + err.message;

        next(err);
    }
}


const showStoreLoginPasswordPage = async function (req, res, next) {

    try {
        res.json(req.body.password);
        res.redirect('/loginPassword/'+req.params.id)
    } catch (error) {
        
    }
}


const storeLoginPassword = async function (req, res, next) {

    try {
        const hash = await loginService.storeLoginPassword(req.params.id);
        if (await bcrypt.compare(req.body.password, hash)) {
            res.json({message:"matched"})
        } else {
            res.json({message:"doesnt match"});
        }

    } catch (err) {
        err["message"] = 'Error while login store password : ' + err.message;

        next(err);
    }
}

const getStoreAddress = async function (req, res, next) {

    try {

        res.json(await addressService.getStoreAddress(req.params.id));
    } catch (err) {
        err["message"] = 'Error while retriving store address: ' + err.message;

        next(err);
    }
}

const addStoreAddress = async function (req, res, next) {

    try {

        res.json(await addressService.addStoreAddress(req.params.id,req.body));
    } catch (err) {
        err["message"] = 'Error while adding store address: ' + err.message;

        next(err);
    }
}

const deleteStoreAddress = async function (req, res, next) {

    try {

        res.json(await addressService.deleteStoreAddress(req.params.id));
    } catch (err) {
        err["message"] = 'Error while deleting store address: ' + err.message;

        next(err);
    }
}

const getStorePaymentInfo = async function (req, res, next) {

    try {

        res.json(await paymentInfoService.getStorePaymentInfo(req.params.id));
    } catch (err) {
        err["message"] = 'Error while retriving payment info: ' + err.message;

        next(err);
    }
}

const addStorePaymentInfo = async function (req, res, next) {

    try {

        res.json(await paymentInfoService.addStorePaymentInfo(req.params.id,req.body));
    } catch (err) {
        err["message"] = 'Error while adding store payment info: ' + err.message;

        next(err);
    }
}

const deleteStorePaymentInfo = async function (req, res, next) {

    try {

        res.json(await paymentInfoService.deleteStorePaymentInfo(req.params.id));
    } catch (err) {
        err["message"] = 'Error while deleting store payment info: ' + err.message;

        next(err);
    }
}





module.exports = {
    addStore,
    getStore,
    updateStore,
    deleteStore,
    addStorePassword,
    storeLoginWithEmail,
    showStoreLoginPasswordPage,
    storeLoginPassword,
    getStoreAddress,
    addStoreAddress,
    deleteStoreAddress,
    getStorePaymentInfo,
    addStorePaymentInfo,
    deleteStorePaymentInfo

}