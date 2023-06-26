// ObjectId() method for converting userID string into an ObjectId for querying the database
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function for counting the number of friends
const friendCount = async (req, res) => {
    try {
        const friendCount = await User.aggregate([
            {
                $match: { _id: ObjectId(req.params.id) }
            },
            {
                $project: {
                    friendCount: { $size: '$friends' }
                }
            }
        ]);
        return res.json(friendCount);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    // Get users
    async getUsers(req, res) {
        try {
            const users = await User.find({});
            const userObj = {
                users,
                friendCount: await friendCount(),
            };
            return res.json(userObj);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Get single user by ID
    async getSingleUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            .select('-__v')
            .lean();

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json({
                user,
                friendCount: await friendCount(),
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.id });

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            // Delete all thoughts associated with the user
            await Thought.deleteMany({ username: user.username });

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add a friend
    async addFriend(req, res) {
        try {
            console.log('You are adding a friend!');
            console.log(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a friend
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};