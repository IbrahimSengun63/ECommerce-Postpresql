// customer crud
// password crud
const query = require('../../db/query');
const bcrypt = require('bcrypt');
const faker = require('@faker-js/faker').faker;
const format = require('pg-format');
const { PerformanceObserver, performance } = require('perf_hooks');





const addCustomer = async function (customer) {

    const sql = 'INSERT INTO customer.customer (firstname,lastname,email) values ($1,$2,$3) RETURNING *'
    const values = [
        customer.firstname,
        customer.lastname,
        customer.email
    ]

    const result = await query(sql, values)
    return result.rows[0];

}

const getCustomer = async function (id) {

    const sql = 'SELECT * FROM customer.customer where id = $1';
    const result = await query(sql, [id]);
    return result.rows[0];
}

const updateCustomer = async function (id, customer) {

    const columns = Object.keys(customer);
    const values = Object.values(customer);
    const m_at = new Date();
    values.push(m_at);
    values.unshift(id)

    const argKeys = Array.from({ length: columns.length + 1 }, (_, i) => "$" + (i + 2)).join(',');

    const sql = "UPDATE customer.customer SET (" + columns + ",m_at) = (" + argKeys + ") WHERE id = $1";
    await query(sql, values);

    return 'User modified with ID: ' + id;

}

const deleteCustomer = async function (id) {

    const d_at = new Date();
    const active = false;

    const sql = "Update customer.customer SET (active,d_at) = ($2,$3) where id = $1";
    await query(sql, [id, active, d_at]);
    return 'User deleted with ID: ' + id;
}

const addCustomerPassword = async function (id, password) {

    const passwords = await getCustomerPassword(id);
    const hash = await bcrypt.hash(password, 10);
    const e_at = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
    const sql = 'INSERT INTO customer.password (customer_id,hash,e_at) values ($1,$2,$3) RETURNING *'

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
            await updateCustomerPassword(id);
            await deleteCustomerPassword(id);
            const result = await query(sql, [id, hash, e_at]);
            return result.rows[0];

        }
        
    }

}


const getCustomerPassword = async function (id, ...args) {

    if (args.length == 0) {
        const sql = 'SELECT * FROM customer.password where customer_id = $1';
        const result = await query(sql, [id]);
        return result.rows;
    } else {
        const sql = 'SELECT * FROM customer.password where customer_id = $1 and active = $2';
        const result = await query(sql, [id, args[0]]);
        return result.rows;
    }

}

const updateCustomerPassword = async function (id) {

    const sql = 'UPDATE customer.password set active = false where customer_id =$1';
    await query(sql, [id]);
}

const deleteCustomerPassword = async function (id) {

    const customer = await getCustomerPassword(id, false);
    if (customer.length > 1) {
        const id = customer[0].id;
        const sql = "DELETE FROM customer.password where id = $1 and active = false";
        await query(sql, [id]);
    }
}


const generateData = function (size) {
    const data = [];
    for (let i = 0; i < size; i++) {
        let fname = faker.name.firstName();
        let lname = faker.name.lastName();
        let email = faker.internet.email((fname + (i / 0.1).toFixed(2)), (lname + (i / 0.1).toFixed(2)), "", { allowSpecialCharacters: true });
        let element = [fname, lname, email];
        data.push(element)
    }
    return data;
}

const addFakeDataToCustomers = async function () {

    const data = generateData(1000000);
    const sql = "INSERT INTO customer.customer (firstname,lastname,email) values %L"
    await query(format(sql, data))

}

async function dataadd() {
    console.log("start");
    let start = performance.now();
    await addFakeDataToCustomers();
    let end = performance.now();

    console.log('duration:', ((end - start) * 0.001 / 60).toFixed(3));
    console.log("end");
}
//dataadd()
//addFakeDataToCustomers()

async function addPasswords() {
    let start = performance.now();
    console.log("start");

    const e_at = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
    const sql = 'INSERT INTO customer.password (customer_id,hash,active,e_at) values ($1,$2,$3,$4)'
    const hash1 = await bcrypt.hash("222", 10);
    const hash2 = await bcrypt.hash("111", 10);

    for (let i = 1; i < 1000001; i++) {
        for (let j = 0; j < 2; j++) {
            if (j == 0) {
                await query(sql, [i, hash1, false, e_at])
            } else {
                await query(sql, [i, hash2, true, e_at])
            }
        }
    }
    let end = performance.now();

    console.log('duration: ', ((end - start) * 0.001 / 60).toFixed(3));
    console.log("end");
}
//addPasswords()


module.exports = {
    addCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer,
    addCustomerPassword
}
