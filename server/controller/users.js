const Users = require("../models/user")


module.exports = {
    getUsers: async (req, res) => {
        try {
            const data = await Users.find()
            if (data) {
                return res.status(200).json(data)

            }
            return res.status(400).json('something went wrong')
        } catch (e) {
            res.status(505).json('internal server error')
        }
    },
    getUserById: async (req, res) => {
        try {
            const data = await Users.findOne({ _id: req.params.id })
            if (data) {
                return res.status(200).json(data)

            }
            return res.status(400).json('something went wrong')
        } catch (e) {
            console.error('Error:', e);
            res.status(505).json('internal server error')
        }
    },
    
    updateUser: async (req, res) => {
        try {
            const data = await Users.updateOne({ _id: req.params.id }, { $set: req.body })
            if (data) return res.status(200).json('updated')
            return res.status(400).json('something went wrong')

        } catch (e) {
            console.error('Error:', e);
            res.status(500).json('internal server error')
        }
    },
    deleteUser: async (req, res) => {
        try {
            const data = await Users.deleteOne({ _id: req.params.id })
            if (data) return res.status(200).json('deleted')
            return res.status(400).json('something went wrong')

        } catch (e) {
            console.error('Error:', e);
            res.status(500).json('internal server error')
        }
    },

}