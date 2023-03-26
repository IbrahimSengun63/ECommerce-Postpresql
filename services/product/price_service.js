//price crud
//discount crud

const query = require('../../db/query');

const getProductPrice = async function (id) {

    const sql = "SELECT * FROM product.price where product_id = $1";
    const result = await query(sql, [id]);
    return result.rows;
}

const addProductPrice = async function (price) {

    const values = [
        price.product_id,
        price.original_price,
        price.discount_price,
    ]

    const sql = "INSERT INTO product.price (product_id,original_price,discount_price) values ($1,$2,$3) RETURNING *";
    const result = await query(sql, values);
    return result.rows;

}

const updateProductPrice = async function (id, price) {
    
    const columns = Object.keys(price);
    const values = Object.values(price);
    values.unshift(id)
    
    const argKeys = Array.from({ length: columns.length }, (_, i) => "$" + (i + 2)).join(',');

    const sql = "UPDATE product.price SET (" + columns + ") = (" + argKeys + ") WHERE id = $1";

    await query(sql, values);

    return 'Product price modified with ID: ' + id;
}

const deleteProductPrice = async function (id) {

    const sql = "DELETE FROM product.price where id = $1";
    await query(sql,[id]);
    return 'Product price deleted with ID: ' + id;

}

const getProductDiscount = async function (id) {

    const sql = "SELECT * FROM product.discount where product_id = $1";
    const result = await query(sql, [id]);
    return result.rows;
}

const addProductDiscount = async function (discount) {

    const values = [
        discount.product_id,
        discount.percent
    ]

    const sql = "INSERT INTO product.discount (product_id,percent) values ($1,$2) RETURNING *";
    const result = await query(sql, values);
    return result.rows;

}

const updateProductDiscount = async function (id, discount) {
    
    const columns = Object.keys(discount);
    const values = Object.values(discount);
    values.unshift(id)

    const argKeys = Array.from({ length: columns.length }, (_, i) => "$" + (i + 2)).join(',');

    const sql = "UPDATE product.discount SET (" + columns + ") = (" + argKeys + ") WHERE id = $1";
    await query(sql, values);

    return 'product discount modified with ID: ' + id;
}

const deleteProductDiscount = async function (id) {

    const sql = "DELETE FROM product.discount where id = $1";
    await query(sql,[id]);
    return 'product discount deleted with ID: ' + id;

}




module.exports = {
    getProductPrice,
    addProductPrice,
    updateProductPrice,
    deleteProductPrice,
    getProductDiscount,
    addProductDiscount,
    updateProductDiscount,
    deleteProductDiscount
}