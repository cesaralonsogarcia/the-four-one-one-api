const { Thought, User } = require('../models');

// Aggregate function for counting the number of reactions
const reactionCount = async (req, res) => {
    try {
        const reactionCount = await Thought.aggregate([
            {
                $match: { _id: ObjectId(req.params.id) }
            },
            {
                $project: {
                    reactionCount: { $size: '$reactions' }
                }
            }
        ]);
        return res.json(reactionCount);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Get single thought by ID
    async getSingleThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id })
            .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            // Add thought to user's thoughts array
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Update a thought by ID
    async updateThoughtById(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a thought by ID
    async deleteThoughtById(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id });

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            const user = await User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Create a reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { reactions: req.body } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};
