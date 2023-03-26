//login crude

//login crud
// login_history crud

const query = require('../../db/query');
const bcrypt = require('bcrypt');


const storeLoginWithEmail = async function (email) {
    //Gilbert3954220.0013@gmail.com
    const sql = 'SELECT * FROM store.store where email = $1 and active = true';
    const result = await query(sql, [email]);
    return result.rows[0].id;
}

const storeLoginPassword = async function (id) {

    const sql = 'SELECT * FROM store.password where store_id = $1 and active = true'
    const result = await query(sql, [id]);
    return result.rows[0].hash;
}


module.exports = {
    storeLoginWithEmail,
    storeLoginPassword
}