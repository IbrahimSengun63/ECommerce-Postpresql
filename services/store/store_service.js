//store crud

const query = require('../../db/query');
const bcrypt = require('bcrypt');
const format = require('pg-format');
const { PerformanceObserver, performance } = require('perf_hooks');




const addStore = async function (store) {

    const sql = 'INSERT INTO store.store (name,email) values ($1,$2) RETURNING *'
    const values = [
        store.name,
        store.email
    ]

    const result = await query(sql, values)
    return result.rows[0];

}

const getStore = async function (id) {

    const sql = 'SELECT * FROM store.store where id = $1';
    const result = await query(sql, [id]);
    return result.rows[0];
}

const updateStore = async function (id, store) {

    const columns = Object.keys(store);
    const values = Object.values(store);
    const m_at = new Date();
    values.push(m_at);
    values.unshift(id)

    const argKeys = Array.from({ length: columns.length + 1 }, (_, i) => "$" + (i + 2)).join(',');

    const sql = "UPDATE store.store SET (" + columns + ",m_at) = (" + argKeys + ") WHERE id = $1";
    await query(sql, values);

    return 'store modified with ID: ' + id;

}

const deleteStore = async function (id) {

    const d_at = new Date();
    const active = false;

    const sql = "Update store.store SET (active,d_at) = ($2,$3) where id = $1";
    await query(sql, [id, active, d_at]);
    return 'store deleted with ID: ' + id;
}

const addStorePassword = async function (id, password) {

    const passwords = await getStorePassword(id);
    const hash = await bcrypt.hash(password, 10);
    const e_at = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
    const sql = 'INSERT INTO store.password (store_id,hash,e_at) values ($1,$2,$3) RETURNING *'

    for (let i = 0; i < 2; i++) {

        if (passwords.length == 0 && i == 0) {
            const result = await query(sql, [id, hash, e_at]);
            return result.rows[0];
        }

        if (passwords.length > 0) {
            let hash = passwords.pop().hash;
            if (await bcrypt.compare(password, hash)) {
                return { message: "the password cannot be the same as the last two passwords" }
            }

        }

        if (passwords.length == 0 && i == 1) {
            await updateStorePassword(id);
            await deleteStorePassword(id);
            const result = await query(sql, [id, hash, e_at]);
            return result.rows[0];

        }
        
    }

}


const getStorePassword = async function (id,...args) {

    if (args.length == 0) {
        const sql = 'SELECT * FROM store.password where store_id = $1';
        const result = await query(sql, [id]);
        return result.rows;
    } else {
        const sql = 'SELECT * FROM store.password where store_id = $1 and active = $2';
        const result = await query(sql, [id, args[0]]);
        return result.rows;
    }
}

const updateStorePassword = async function (id) {

    const sql = 'UPDATE store.password set active = false where store_id =$1';
    await query(sql, [id]);
}

const deleteStorePassword = async function (id) {

    const passwords = await getStorePassword(id, false);
    if (passwords.length > 1) {
        const id = passwords[0].id;
        const sql = "DELETE FROM store.password where id = $1 and active = false";
        await query(sql, [id]);
    }

}





module.exports = {
    addStore,
    getStore,
    updateStore,
    deleteStore,
    addStorePassword
}
