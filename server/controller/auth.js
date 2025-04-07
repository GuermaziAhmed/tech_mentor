const User = require("../models/user")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { use } = require("../routes/auth");


module.exports = {
    register: async (req, res) => {
        try {
            const salt = 10;
            const hash = bcrypt.hashSync(req.body.password, salt);

            const user = await User.create({
                name:req.body.name,
                email:req.body.email,
                password:hash
            });

            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(400).json({ error: 'Something went wrong' });
            }
        } catch (e) {
            console.error('Error:', e);
            return res.status(500).json({ error: 'Internal server error' });
        }
    
    },
    login: async (req, res) => {
        try {
        
            const user = await User.findOne({email:req.body.email});
            if(!user) return res.status(404).json({ error: 'user not found' });
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            if(!isValidPassword) return res.status(400).json({ error: 'wrong password or email' });
            const token = jwt.sign({ id: user._id ,role:user.role }, process.env.JWT);
            const { password,role,...otherDetails} = user._doc;
            return res.cookie("acces_token",token,{
                httpOnly:true,
            }).status(200).json({ userId: user._id, ...otherDetails } );
        } catch (e) {
            console.error('Error:', e);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}