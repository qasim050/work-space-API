 require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UnauthenticatedError} = require("../errors");

// const authMiddleware = async (req,res,next) => {
//  const authHeaders = req.headers.authorization
//  if(!authHeaders || !authHeaders.startsWith("Bearer ")){
//     throw new UnauthenticatedError("plass provid valid token")
//  }
//  const token = authHeaders.split(" ")[1]
//  try {
//     const {userId,name} = jwt.verify(token,process.env.JWT_SECRET)
//     req.user = {userId,name}
//     next()
//  } catch (error) {
//     throw new UnauthenticatedError("authentication invalid")
//  }
// }

const authMiddleware = async (req,res,next) =>{
   const authHeaders = req.headers['authorization']
   if(!authHeaders || ! authHeaders.startsWith("Bearer ")){
      throw new UnauthenticatedError("please provid token")
   }
   const token = authHeaders.split(" ")[1]
   try {
      const {userID,name,role} = jwt.verify(token,process.env.JWT_SECRET)
      req.user = {userID,name,role}
      next()
      
   } catch (error) {
      throw new UnauthenticatedError("token is not valid")
   }
}
const authoriz = (allowedRoles) => {
   return (req,res,next) =>{
      if(!allowedRoles.includes(req.user.role)){
          return res.status(403).json({ error: 'Insufficient permissions' });
      }
      next()
   }
}

module.exports = {authMiddleware,authoriz}