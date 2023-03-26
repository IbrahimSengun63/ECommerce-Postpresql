//category crud

const query = require('../../db/query');

const getCategory = async function (id) {

    const sql = "SELECT * FROM product.categories where id = $1";
    const result = await query(sql, [id]);
    return result.rows[0];
}

const addCategory = async function (category) {

    const values = [
        category.name,
        category.description
    ]

    const sql = "INSERT INTO product.categories (name,description) values ($1,$2) RETURNING *";
    const result = await query(sql, values);
    return result.rows;

}

const updateCategory = async function (id, category) {
    
    const columns = Object.keys(category);
    const values = Object.values(category);
    values.unshift(id)

    const argKeys = Array.from({ length: columns.length }, (_, i) => "$" + (i + 2)).join(',');

    const sql = "UPDATE product.categories SET (" + columns + ") = (" + argKeys + ") WHERE id = $1";
    await query(sql, values);

    return 'Category modified with ID: ' + id;
}

const deleteCategory = async function (id) {

    const sql = "DELETE FROM product.categories where id = $1";
    await query(sql,[id]);
    return 'Category deleted with ID: ' + id;

}

module.exports = {
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory,
}