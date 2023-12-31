const sql = require('mssql');

const dbConfig = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE ?? 'FESA',
};

export default async function runQuery(query) {
    const pool = await new sql.ConnectionPool({
        ...dbConfig,
        options: {
            trustServerCertificate: true
        }
    }).connect();

    const result = await pool.request().query(query);

    pool.close();
    return result;
}