const User = require("../models/user")
const statusCodes = require("http-status-codes")
const {BadRequestError,NotFoundError,UnauthenticatedError} = require("../errors/index")
const roles = require("../config/constants")
const login = async (req,res) =>{
    const {email,name,password} = req.body
    if((!email&&!name)|| !password){
        throw new BadRequestError("plase provid email and password")
    }
    let user 
    if(email){
         user = await User.findOne({email})
    }else if(name){
         user = await User.findOne({name})
    }
    if(!user){
        throw new NotFoundError("user not found")
    }
    const isPassword = await user.comparePassword(password)
    if(!isPassword){
        throw new UnauthenticatedError("invalid caredentials")
    }   
    const token = user.createJWT()
    res.status(statusCodes.OK).json({username:user.name,"token":token})
}
const register = async (req,res) =>{
    const {name,password,email} = req.body
    const role = "manager"
    if(role == roles.ADMIN){
        throw new BadRequestError("can not create admin user")
    }
    const user = await User.create({name,password,email,role})
    const token = user.createJWT()
    res.status(statusCodes.CREATED).json({"user":user.name,"email":user.email,"role":user.role,"token":token})
}
module.exports = {login,register}