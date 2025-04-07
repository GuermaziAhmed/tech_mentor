const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: (req, res, next) => {
        try {
            const token = req.cookies.acces_token
            if (!token) return res.status(401).json({ message: "Access denied. No token" });
            jwt.verify(token, process.env.JWT, (err, user) => {
                if (err) return res.status(403).json({ message: "Token is invalid" });
                console.log("Decoded User:", user);
                req.user = user;
                next();
            })

        } catch (e) {
            console.error('Error:', e);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    verifyUser: (req, res, next) => {
        try {
            if (req.user.id === req.params.id || req.user.role === 'admin') {
                next()
            }
            else {
                return res.status(403).json({ message: "You are not authorized to access this resource" })
            }

        } catch (e) {
            console.error('Error:', e);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    verifyAdmin: (req, res, next) => {
        try {
            if (req.user.role === 'admin') {
                next()
            }
            else {
                return res.status(403).json({ message: "You are not authorized to access this resource" })
            }

        } catch (e) {
            console.error('Error:', e);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
