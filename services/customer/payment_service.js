//payment_info service

const query = require('../../db/query');

const getCustomerPaymentInfo = async function (id) {

    const sql = 'SELECT * FROM customer.payment_info where customer_id = $1';
    const result = await query(sql, [id]);
    return result.rows;
}


const addCustomerPaymentInfo = async function (id, payment) {

    const values = [
        id,
        payment.credit_card_no,
        payment.ccv_no,
        payment.date
    ]
    const sql = "INSERT INTO customer.payment_info (customer_id,credit_card_no,ccv_no,date) values ($1,$2,$3,$4) RETURNING *"
    const result = await query(sql, values)
    return result.rows;

}

const deleteCustomerPaymentInfo = async function (id) {
    
    const sql = "DELETE FROM customer.payment_info where id = $1"
    await query(sql, [id]);
}





module.exports = {
    getCustomerPaymentInfo,
    addCustomerPaymentInfo,
    deleteCustomerPaymentInfo
}