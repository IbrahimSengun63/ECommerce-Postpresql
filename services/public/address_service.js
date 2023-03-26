//cities service
//districts service
//neighbourhood service

const query = require('../../db/query');

const getAddresses = async function () {

    const sql = `select n.id as province_id,
    c.name as city,
    d.name as district,
    n.name as neighbourhood
    from public.cities c
    inner join public.districts d on d.city_id = c.id
    inner join public.neighbourhoods n on n.district_id = d.id`;

    const result = await query(sql)
    return result.rows;

}


module.exports = {
    getAddresses
}
