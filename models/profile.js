const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    bank: {
        type: Number,
        default: 500
    },
    location: {
        type: String,
        required: true,
        default: "City/State"
    },
    casino: {
        type: String,
        required: true,
        default: "Casino Madness"
    },
    favgame: {
        type: String,
        required: true,
        default: "All of them"
    },
    bio: {
        type: String,
        default: "Bio"
    },
    status: {
        type: String,
        default: "New Status"
    },
    wins: [
        {
            drawpoker: {
                type: Number,
                default: 0
            },
        },
        {
            blackjack: {
                type: Number,
                default: 0
            }
        },
        {
            craps: {
                type: Number,
                default: 0
            }
        },
        {
            roullette: {
                type: Number,
                default: 0
            }
        },
        {
            slots: {
                type: Number,
                default: 0
            }
        }
    ],
    losses: [
        {
            drawpoker: {
                type: Number,
                default: 0
            }
        },
        {
            blackjack: {
                type: Number,
                default: 0
            }
        },
        {
            craps: {
                type: Number,
                default: 0
            }
        },
        {
            roullette: {
                type: Number,
                default: 0
            }
        },
        {
            slots: {
                type: Number,
                default: 0
            }
        },
        {
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
});

module.exports = mongoose.model('Profile', profileSchema);