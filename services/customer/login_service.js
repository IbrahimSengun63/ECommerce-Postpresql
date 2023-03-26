//login crud
// login_history crud

const query = require('../../db/query');
const bcrypt = require('bcrypt');


const customerLoginWithEmail = async function (email) {
    //Gilbert3954220.0013@gmail.com
    const sql = 'SELECT * FROM customer.customer where email = $1 and active = true';
    const result = await query(sql, [email]);
    return result.rows[0].id;
}

const customerLoginPassword = async function (id) {

    const sql = 'SELECT * FROM customer.password where customer_id = $1 and active = true'
    const result = await query(sql, [id]);
    return result.rows[0].hash;
}


module.exports = {
    customerLoginWithEmail,
    customerLoginPassword
}