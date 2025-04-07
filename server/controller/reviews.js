const review = require("../models/review")



module.exports = {
    getreviews: async (req, res) => {
        try {
            const data = await review.find()
                .populate('coachId', 'image name role rating')  // Populating coach image along with review
                .populate('userId', 'name role image')
                .exec();
            if (data) {

                return res.status(200).json(data)

            }
            return res.status(400).json('something went wrong')
        } catch (e) {
            console.error('Error:', e.message)
            res.status(505).json('internal server error')
        }
    },
    getreviewById: async (req, res) => {
        try {
            const data = await review.findOne({ _id: req.params.id })
            if (data) {
                return res.status(200).json(data)

            }
            return res.status(400).json('something went wrong')
        } catch (e) {
            res.status(505).json('internal server error')
        }
    },
    getreviewByCoachId: async (req, res) => {
        try {
            console.log(req.params.id)
            const data = await review
                .find({ coachId: req.params.id })
                .populate('coachId', 'image name role rating')  // Populating coach image along with review
                .populate('userId', 'name role image')
                .exec();
            if (data && data.length > 0) {
                return res.status(200).json(data);
            }
            console.log(data)
            return res.status(404).json({ message: 'No reviews found for this coach.' });
        } catch (e) {
            console.error("Error:", e);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    addreview: async (req, res) => {
        try {

            // Create a new record in the Ahmed collection
            const data = await review.create(req.body);

            if (data) {
                return res.status(200).json(data);
            } else {
                return res.status(400).json({ error: 'Something went wrong' });
            }
        } catch (e) {
            console.error('Error:', e);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    updatereview: async (req, res) => {
        try {
            const data = await review.updateOne({ _id: req.params.id }, { $set: req.body })
            if (data) return res.status(200).json('updated')
            return res.status(400).json('something went wrong')

        } catch (e) {
            res.status(500).json('internal server error')
        }
    },
    deletereview: async (req, res) => {
        try {
            const data = await review.deleteOne({ _id: req.params.id })
            if (data) return res.status(200).json('deleted')
            return res.status(400).json('something went wrong')

        } catch (e) {
            res.status(500).json('internal server error')
        }
    },

}