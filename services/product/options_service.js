//option crud
//images crud

const query = require('../../db/query');

const getProductOptions = async function (id) {

    const sql = "SELECT * FROM product.options where product_id = $1";
    const result = await query(sql, [id]);
    return result.rows;
}

const addProductOptions = async function (options) {

    const values = [
        options.product_id,
        options.description
    ]

    const sql = "INSERT INTO product.options (product_id,description) values ($1,$2) RETURNING *";
    const result = await query(sql, values);
    return result.rows;

}

const updateProductOptions = async function (id, options) {

    const columns = Object.keys(options);
    const values = Object.values(options);
    values.unshift(id)

    const argKeys = Array.from({ length: columns.length }, (_, i) => "$" + (i + 2)).join(',');

    const sql = "UPDATE product.options SET (" + columns + ") = (" + argKeys + ") WHERE id = $1";
    await query(sql, values);

    return 'Product options modified with ID: ' + id;
}

const deleteProductOptions = async function (id) {

    const sql = "DELETE FROM product.options where id = $1";
    await query(sql, [id]);
    return 'Product options deleted with ID: ' + id;

}

const getProductOptionImages = async function (id) {

    const sql = "SELECT * FROM product.images where product_options = $1";
    const result = await query(sql, [id]);
    return result.rows;
}

const addProductOptionImages = async function (images) {

    const values = [
        images.product_options,
        images.source
    ]

    const sql = "INSERT INTO product.images (product_options,source) values ($1,$2) RETURNING *";
    const result = await query(sql, values);
    return result.rows;

}

const updateProductOptionImages = async function (id, images) {

    const columns = Object.keys(images);
    const values = Object.values(images);
    values.unshift(id)

    const argKeys = Array.from({ length: columns.length }, (_, i) => "$" + (i + 2)).join(',');

    const sql = "UPDATE product.images SET (" + columns + ") = (" + argKeys + ") WHERE id = $1";
    await query(sql, values);

    return 'Product options images modified with ID: ' + id;
}

const deleteProductOptionImages = async function (id) {

    const sql = "DELETE FROM product.images where id = $1";
    await query(sql, [id]);
    return 'Product options images deleted with ID: ' + id;

}




module.exports = {
    getProductOptions,
    addProductOptions,
    updateProductOptions,
    deleteProductOptions,
    getProductOptionImages,
    addProductOptionImages,
    updateProductOptionImages,
    deleteProductOptionImages
}