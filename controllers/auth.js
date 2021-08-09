const User = require('../models/user');


exports.createOrUpdateUser = async (req, res) => {
    const { name, email } = req.user;
    // update
    const user = await User.findOneAndUpdate({ email: email }, { name: name }, { new: true });

    if (user) {
        console.log("user updated");
        res.json(user);
    } else {
        const newUser = await new User({
            email, name
        }).save();
        console.log("User created");
        res.json(newUser);
    }
};

exports.currentUser = async (req, res) => {
    User.findOne({ email: req.user.email }).exec((err, user) => {
        if (err) {
            throw new Error(err);
        } else {
            res.json(user);
        }
    });
};