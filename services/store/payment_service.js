//payment_info service

//payment_info service

const query = require('../../db/query');

const getStorePaymentInfo = async function (id) {

    const sql = 'SELECT * FROM store.payment_info where store_id = $1';
    const result = await query(sql, [id]);
    return result.rows;
}


const addStorePaymentInfo = async function (id, payment) {

    const values = [
        id,
        payment.credit_card_no,
        payment.ccv_no,
        payment.date
    ]
    const sql = "INSERT INTO store.payment_info (store_id,credit_card_no,ccv_no,date) values ($1,$2,$3,$4) RETURNING *"
    const result = await query(sql, values)
    return result.rows;

}

const deleteStorePaymentInfo = async function (id) {
    
    const sql = "DELETE FROM store.payment_info where id = $1"
    await query(sql, [id]);
}





module.exports = {
    getStorePaymentInfo,
    addStorePaymentInfo,
    deleteStorePaymentInfo
}