const Profile = require('../models/profile');

exports.createOrUpdateProfile = async (req, res) => {
    const { id } = req.body;

    // update
    const profile = await Profile.findOneAndUpdate({ user: id }, { new: true });

    if (profile) {
        console.log("user updated");
        res.json(profile);
    } else {
        const newProfile = await new Profile({
            id,
        }).save();
        console.log("User created");
        res.json(newProfile);
    }
};

exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    const updated = req.body.newValues;

    // update
    const profile = await Profile.findOneAndUpdate({ user: id }, updated, { new: true });

    if (profile) {
        console.log("user updated");
        res.json(profile);
    } else {
        const newProfile = await new Profile({
            id,
        }).save();
        console.log("User created");
        res.json(newProfile);
    }
};

exports.currentProfile = async (req, res) => {
    const { id } = req.body;
    Profile.findOne({ user: id })
        .exec((err, profile) => {
            if (err) {
                throw new Error(err);
            } else {
                res.json(profile);
            }
        });

};