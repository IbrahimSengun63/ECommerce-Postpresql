const Pool = require('pg').Pool
const config = require('./config');

const pool = new Pool(config);
const { PerformanceObserver, performance } = require('perf_hooks');

async function query(sql, params) {
    const client = await pool.connect();
    try {
        
        const results = await client.query(sql, params);
        return results;
    }
    catch (err) {
        //const error = {rows:[err]}
        console.log(err.message);
    }
    finally {
        client.release();
    }
}


module.exports = query;



