const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        requires: 'Name can\'t be empty'
    },
    email: {
        type: String,
        requires: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        requires: 'Password can\'t be empty',
        minLength: [4, 'Password must be at least 4 character long']

    },
    saltSecret: {
        type: String
    }
});

// Custom validation for email field
userSchema.path('email').validate((value) => {
    emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegEx.test(value);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        })
    })
});

mongoose.model('User', userSchema);
