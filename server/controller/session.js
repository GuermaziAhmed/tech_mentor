const session = require("../models/session")


module.exports = {
    getsessions: async (req, res) => {
        try {
            const data = await session
            .find()
            .populate('coachId', 'image name role rating')  
            .populate('userId', 'name')
            if (data) {
                return res.status(200).json(data)

            }
            return res.status(400).json('something went wrong')
        } catch (e) {
            console.error("Error",e)
            res.status(505).json('internal server error')
        }
    },
    getSessionsByUserId: async (req, res) => {
        try {
            console.log("Received userId:", req.params.userId);
            const data = await session
                .find({ userId: req.params.userId })
                .populate('coachId', 'image name role rating')
                .populate('userId', 'name');
            if (data && data.length > 0) {
                return res.status(200).json(data);
            }
            console.log(data)
            return res.status(404).json({ message: 'No sessions found for this user.' });
        } catch (e) {
            console.error("Error:", e);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getsessionById: async (req, res) => {
        try {
            const data = await session
            .findOne({ _id: req.params.id })
            .populate('coachId', 'image name role rating')  
            .populate('userId', 'name')
            if (data) {
                return res.status(200).json(data)
                
            }
            return res.status(400).json('something went wrong')
        } catch (e) {
            console.error("Error",e)
            res.status(505).json('internal server error')
        }
    },
    addsession: async (req, res) => {
        try {

            // Create a new record in the Ahmed collection
            const data = await session.create(req.body);

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
    updatesession: async (req, res) => {
        try {
            const data = await session.updateOne({ _id: req.params.id }, { $set: req.body })
            if (data) return res.status(200).json('updated')
            return res.status(400).json('something went wrong')

        } catch (e) {
            res.status(500).json('internal server error')
        }
    },
    deletesession: async (req, res) => {
        try {
            const data = await session.deleteOne({ _id: req.params.id })
            if (data) return res.status(200).json('deleted')
            return res.status(400).json('something went wrong')

        } catch (e) {
            res.status(500).json('internal server error')
        }
    },

}