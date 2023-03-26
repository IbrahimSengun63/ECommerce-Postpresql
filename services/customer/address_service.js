
const query = require('../../db/query');


const getCustomerAddress = async function (id) {

    const sql = 'SELECT * FROM customer.address where customer_id = $1';
    const result = await query(sql, [id]);
    return result.rows;
}


const addCustomerAddress = async function (id, address) {

    const values = [
        id,
        address.province_id,
        address.address,
        address.phone_no
    ]
    const sql = "INSERT INTO customer.address (customer_id,province_id,address,phone_no) values ($1,$2,$3,$4) RETURNING *"
    const result = await query(sql, values)
    return result.rows;

}

const deleteCustomerAddress = async function (id) {
    
    const sql = "DELETE FROM customer.address where id = $1"
    await query(sql, [id]);
}



module.exports = {
    getCustomerAddress,
    addCustomerAddress,
    deleteCustomerAddress
}
