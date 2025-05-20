const mysql = require('mysql2');

const db = mysql.createConnection({
     host: 'bqg1ptpamxvwlpgim9a0-mysql.services.clever-cloud.com',       // e.g., bb6ccfbc-xyz.mysql.db
    user: 'uxknbukjzxsxdlaj',                  // e.g., u1abcdx
    password: '4ggVIWOoAnZs5tniGP2I',              // from Clever Cloud
    database: 'bqg1ptpamxvwlpgim9a0',         // e.g., bb6ccfbcxyz
    port: 3306,                             // usually 3306, but confirm
    ssl: {
        // Accept self-signed certificates
        rejectUnauthorized: false
    }
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('✅ Connected to Clever Cloud MySQL database.');
});

module.exports = db;

