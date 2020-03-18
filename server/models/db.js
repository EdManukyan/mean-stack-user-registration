const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (error) => {
    if (!error) {
        console.log('DB is connected')
    } else {
        console.log('Connection failed' + JSON.stringify(error, undefined, 2));
    }
});

require('./user.model');
