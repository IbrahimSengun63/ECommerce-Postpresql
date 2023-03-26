const addressService = require('../services/public/address_service');


const getAddresses = async function (req, res, next) {

    try {

        res.json(await addressService.getAddresses());
    } catch (err) {
        err["message"] = 'Error while retriving addresses: ' + err.message;

        next(err);
    }
}

module.exports = {
    getAddresses
}