//address crud


const query = require('../../db/query');

const getStoreAddress = async function (id) {

    const sql = 'SELECT * FROM store.address where store_id = $1';
    const result = await query(sql, [id]);
    return result.rows;
}

const addStoreAddress = async function (id, address) {

    const values = [
        id,
        address.province_id,
        address.address,
        address.phone_no
    ]
    const sql = "INSERT INTO store.address (store_id,province_id,address,phone_no) values ($1,$2,$3,$4) RETURNING *"
    const result = await query(sql, values)
    return result.rows;

}

const deleteStoreAddress = async function (id) {
    
    const sql = "DELETE FROM store.address where id = $1"
    await query(sql, [id]);
}




module.exports = {
    getStoreAddress,
    addStoreAddress,
    deleteStoreAddress
}
