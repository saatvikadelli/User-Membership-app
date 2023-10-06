//to parse the cookie
import  jwt  from "jsonwebtoken";//get the payload from token which is userid
import asyncHandler from 'express-async-handler';
import User from "../../models/usermodel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if(token) {
        try{
            const decoded = jwt.verify(token,  process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        }catch(error) { 
            res.status(401);
            throw new Error('Not authorised, invalid token');
        }

    } else {
        res.status(401);
        throw new Error( 'Not Authorised, no token');
    }
});

//add admin middleware


const isAdmin = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user && user.role === 1) {
            next(); // User is an admin, proceed to the next middleware
        } else {
            res.status(401).send({
                success: false,
                message: "Unauthorized Access"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middleware"
        });
    }
});

export default isAdmin;

  
  
  

export { protect , isAdmin };