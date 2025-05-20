const mysql = require('mysql2');

const dbConfig = {
  host: 'bqg1ptpamxvwlpgim9a0-mysql.services.clever-cloud.com',
  user: 'uxknbukjzxsxdlaj',
  password: '4ggVIWOoAnZs5tniGP2I',
  database: 'bqg1ptpamxvwlpgim9a0',
  port: 3306,
  ssl: { rejectUnauthorized: false },
  connectTimeout: 10000
};

function testConnection() {
  const connection = mysql.createConnection(dbConfig);

  connection.connect(err => {
    if (err) {
      console.error('Connection failed:', err.message);
    } else {
      console.log('✅ Connected to DB');
      connection.end();
    }
  });
}

// Test connection every 10 seconds (for example)
setInterval(testConnection, 10000);
