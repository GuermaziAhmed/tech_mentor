const Coach = require("../models/coach")



module.exports = {
    getCoaches: async (req, res) => {
        try {
            const { name, role, specialization, minRate, maxRate, rating } = req.query;

            
            const filters = {};

            if (name) filters.name = new RegExp(name, 'i'); 
            if (specialization) {
                const specializationArray = specialization.split(' ');
                filters.specializations = { $all: specializationArray.map(spec => new RegExp(spec, 'i')) };
            }
            
            if (minRate || maxRate) {
                filters.hourlyRate = {};
                if (minRate) filters.hourlyRate.$gte = Number(minRate); 
                if (maxRate) filters.hourlyRate.$lte = Number(maxRate); 
            }
            if (rating) filters.rating = { $gte: Number(rating) }; 

            console.log('Filters:', filters);
            
            const coaches = await Coach.find(filters);

            if (coaches.length === 0) {
                return res.status(404).json({ message: "No coaches found matching your criteria." });
            }
            res.status(200).json(coaches);
        } catch (error) {
            console.error("Error searching for coaches:", error);
            res.status(500).json({ error: "An error occurred while searching for coaches." });
        }
    },
    getCoacheById: async (req, res) => {
        try {
            const data = await Coach.findOne({ _id: req.params.id })
            if (data) {
                return res.status(200).json(data)

            }
            return res.status(400).json('something went wrong')
        } catch (e) {
            res.status(505).json('internal server error')
        }
    },
    addCoach: async (req, res) => {
        try {


            // Create a new record in the Ahmed collection
            const data = await Coach.create(req.body);

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
    updateCoach: async (req, res) => {
        try {
            const data = await Coach.updateOne({ _id: req.params.id }, { $set: req.body })
            if (data) return res.status(200).json('updated')
            return res.status(400).json('something went wrong')

        } catch (e) {
            res.status(500).json('internal server error')
        }
    },
    deleteCoach: async (req, res) => {
        try {
            const data = await Coach.deleteOne({ _id: req.params.id })
            if (data) return res.status(200).json('deleted')
            return res.status(400).json('something went wrong')

        } catch (e) {
            res.status(500).json('internal server error')
        }
    },

}