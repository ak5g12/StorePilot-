const dns=require('dns');
dns.setServers(['1.1.1.1','8.8.8.8'])
require('dotenv').config();
const app = require('./app');
const connectDB = require('./database/db');

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});
