//vendor crud
// inventory crud


const query = require('../../db/query');

const getProductInventory = async function (id) {

    const sql = "SELECT * FROM product.inventory where product_id = $1";
    const result = await query(sql, [id]);
    return result.rows;
}

const addProductInventory = async function (inventory) {

    const values = [
        inventory.product_id,
        inventory.stock
    ]

    const sql = "INSERT INTO product.inventory (product_id,stock) values ($1,$2) RETURNING *";
    const result = await query(sql, values);
    return result.rows;

}

const updateProductInventory = async function (id, inventory) {
    
    const columns = Object.keys(inventory);
    const values = Object.values(inventory);
    values.unshift(id)

    const argKeys = Array.from({ length: columns.length }, (_, i) => "$" + (i + 2)).join(',');

    const sql = "UPDATE product.inventory SET (" + columns + ") = (" + argKeys + ") WHERE id = $1";
    await query(sql, values);

    return 'Product inventory modified with ID: ' + id;
}

const deleteProductInventory = async function (id) {

    const sql = "DELETE FROM product.inventory where id = $1";
    await query(sql,[id]);
    return 'Product inventory deleted with ID: ' + id;

}

const getVendorProductInventory = async function (id) {

    const sql = "SELECT * FROM product.vendor where inventory_id = $1";
    const result = await query(sql, [id]);
    return result.rows;
}

const addVendorProductInventory = async function (vendor) {

    const values = [
        vendor.store_id,
        vendor.inventory_id
    ]

    const sql = "INSERT INTO product.vendor (store_id,inventory_id) values ($1,$2) RETURNING *";
    const result = await query(sql, values);
    return result.rows;

}

const updateVendorProductInventory = async function (id, vendor) {
    
    const columns = Object.keys(vendor);
    const values = Object.values(vendor);
    values.unshift(id)

    const argKeys = Array.from({ length: columns.length }, (_, i) => "$" + (i + 2)).join(',');

    const sql = "UPDATE product.vendor SET (" + columns + ") = (" + argKeys + ") WHERE id = $1";
    await query(sql, values);

    return 'Vendor product inventory modified with ID: ' + id;
}

const deleteVendorProductInventory = async function (id) {

    const sql = "DELETE FROM product.vendor where id = $1";
    await query(sql,[id]);
    return 'Vendor product inventory deleted with ID: ' + id;

}




module.exports = {
    getProductInventory,
    addProductInventory,
    updateProductInventory,
    deleteProductInventory,
    getVendorProductInventory,
    addVendorProductInventory,
    updateVendorProductInventory,
    deleteVendorProductInventory
}