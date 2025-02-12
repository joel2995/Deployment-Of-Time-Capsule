const jwt = require('jsonwebtoken');

exports.authenticateToken = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Access denied. No token provided.' 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ 
            success: false, 
            message: 'Invalid token' 
        });
    }
};

// Optional: Admin middleware
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ 
                success: false, 
                message: 'Access denied. Admin rights required.' 
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: 'Error checking admin rights' 
        });
    }
};