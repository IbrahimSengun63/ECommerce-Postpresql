//product crud

const query = require('../../db/query');


const getProduct = async function (id) {

    const sql = "SELECT * FROM product.product where id = $1 and active = true";
    const result = await query(sql, [id]);
    return result.rows[0];
}

const addProduct = async function (product) {

    const values = [
        product.name,
        product.sku,
        product.category_id
    ]

    const sql = "INSERT INTO product.product (name,sku,category_id) values ($1,$2,$3) RETURNING *";
    const result = await query(sql, values);
    return result.rows;

}

const updateProduct = async function (id, product) {
    
    const columns = Object.keys(product);
    const values = Object.values(product);
    const m_at = new Date();
    values.push(m_at);
    values.unshift(id)

    const argKeys = Array.from({ length: columns.length + 1 }, (_, i) => "$" + (i + 2)).join(',');

    const sql = "UPDATE product.product SET (" + columns + ",m_at) = (" + argKeys + ") WHERE id = $1";
    await query(sql, values);

    return 'Product modified with ID: ' + id;
}

const deleteProduct = async function (id) {

    const d_at = new Date();
    const active = false;

    const sql = "Update product.product SET (active,d_at) = ($2,$3) where id = $1";
    await query(sql, [id, active, d_at]);
    return 'Product deleted with ID: ' + id;

}

module.exports = {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
}