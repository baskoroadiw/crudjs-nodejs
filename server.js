const mongoose = require('mongoose');

require('dotenv').config({ path: '.env' });

//connect to database
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
    console.error(`Database Connection Error -> ${ err.message }`);
});

//require model agar model dapat diakses di semua aplikasi
require('./Models/Posts');


const app = require('./app');

const server = app.listen(3000, () => { 
    console.log(`Website berjalan di localhost port ${server.address().port}`);
})