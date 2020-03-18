const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports.register = (req, res, next) =>{
    var user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password
    });

    user.save((error, doc) => {
        if (!error) {
            res.send(doc);
        } else {
            if (error.code === 11000) {
                res.status(422).send(['Duplicated email address.']);
            } else {
                next(error);
            }
        }
    });
};
