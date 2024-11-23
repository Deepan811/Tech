const jwt = require('jsonwebtoken'); 
const User = require('../models/User')

const protect = async (req, res, next) =>{
    try {

        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(403).json({
                message:"Please login to access",
            })
        }
        //decode jwt signed

        const decodeData = jwt.verify(token,process.env.JWT_SECRET);

        req.user = await User.findById(decodeData._id).select('-password');
        next();
        
    } catch (error) {
        return res.status(403).json({
            message:"Please login to access",
        })
        
    }
}

module.exports = {protect}