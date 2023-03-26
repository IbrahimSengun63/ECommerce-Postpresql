const customerService = require('../services/customer/customer_service');
const loginService = require('../services/customer/login_service');
const addressService = require('../services/customer/address_service');
const paymentInfoService = require('../services/customer/payment_service');
const bcrypt = require('bcrypt');

const addCustomer = async function (req, res, next) {

    try {

        res.json(await customerService.addCustomer(req.body));
    } catch (err) {
        err["message"] = 'Error while adding customer: ' + err.message;

        next(err);
    }
}

const getCustomer = async function (req, res, next) {

    try {

        res.json(await customerService.getCustomer(req.params.id));
    } catch (err) {
        err["message"] = 'Error while retriving customer: ' + err.message;

        next(err);
    }
}

const updateCustomer = async function (req, res, next) {

    try {

        res.json(await customerService.updateCustomer(req.params.id, req.body));
    } catch (err) {
        err["message"] = 'Error while updating customer: ' + err.message;

        next(err);
    }
}

const deleteCustomer = async function (req, res, next) {

    try {

        res.json(await customerService.deleteCustomer(req.params.id));
    } catch (err) {
        err["message"] = 'Error while deleting customer: ' + err.message;

        next(err);
    }
}

const addCustomerPassword = async function (req, res, next) {

    try {

        res.json(await customerService.addCustomerPassword(req.params.id, req.body.password));
    } catch (err) {
        err["message"] = 'Error while adding customer password: ' + err.message;

        next(err);
    }
}

const customerLoginWithEmail = async function (req, res, next) {

    try {

        const id = await loginService.customerLoginWithEmail(req.body.email);
        res.redirect('/loginPassword/' + id);
    } catch (err) {
        err["message"] = 'Error while login with customer email: ' + err.message;

        next(err);
    }
}


const showCustomerLoginPasswordPage = async function (req, res, next) {

    try {
        res.json(req.body.password);
        res.redirect('/loginPassword/' + req.params.id)
    } catch (error) {

    }
}


const customerLoginPassword = async function (req, res, next) {

    try {
        const hash = await loginService.customerLoginPassword(req.params.id);
        if (await bcrypt.compare(req.body.password, hash)) {
            res.json({ message: "matched" })
        } else {
            res.json({ message: "doesnt match" });
        }
        
    } catch (err) {
        err["message"] = 'Error while login customer password : ' + err.message;

        next(err);
    }
}

const getCustomerAddress = async function (req, res, next) {

    try {

        res.json(await addressService.getCustomerAddress(req.params.id));
    } catch (err) {
        err["message"] = 'Error while retriving customer address: ' + err.message;

        next(err);
    }
}

const addCustomerAddress = async function (req, res, next) {

    try {

        res.json(await addressService.addCustomerAddress(req.params.id,req.body));
    } catch (err) {
        err["message"] = 'Error while adding customer address: ' + err.message;

        next(err);
    }
}

const deleteCustomerAddress = async function (req, res, next) {

    try {

        res.json(await addressService.deleteCustomerAddress(req.params.id));
    } catch (err) {
        err["message"] = 'Error while deleting customer address: ' + err.message;

        next(err);
    }
}

const getCustomerPaymentInfo = async function (req, res, next) {

    try {

        res.json(await paymentInfoService.getCustomerPaymentInfo(req.params.id));
    } catch (err) {
        err["message"] = 'Error while retriving customer payment info: ' + err.message;

        next(err);
    }
}

const addCustomerPaymentInfo = async function (req, res, next) {

    try {

        res.json(await paymentInfoService.addCustomerPaymentInfo(req.params.id,req.body));
    } catch (err) {
        err["message"] = 'Error while adding customer payment info: ' + err.message;

        next(err);
    }
}

const deleteCustomerPaymentInfo = async function (req, res, next) {

    try {

        res.json(await paymentInfoService.deleteCustomerPaymentInfo(req.params.id));
    } catch (err) {
        err["message"] = 'Error while deleting customer payment info: ' + err.message;

        next(err);
    }
}



module.exports = {
    addCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer,
    addCustomerPassword,
    customerLoginWithEmail,
    showCustomerLoginPasswordPage,
    customerLoginPassword,
    getCustomerAddress,
    addCustomerAddress,
    deleteCustomerAddress,
    getCustomerPaymentInfo,
    addCustomerPaymentInfo,
    deleteCustomerPaymentInfo

}