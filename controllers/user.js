const User = require("../models/user")
const statusCodes = require("http-status-codes")
const roles = require("../config/constants")
const {BadRequestError,NotFoundError} = require("../errors/index")

const getAllUsers = async (req,res) => {
    const users = await User.find()
    if(users.length === 0){
        throw new NotFoundError("there is no users")
    }
    res.status(statusCodes.OK).json({"users":users})
}
const getUser = async (req,res) => {
    const id = req.params.id
    const user = await User.findById(id)
    if(!user){
        throw new NotFoundError(`there is no user with id: ${id}`)
    }
    res.status(statusCodes.OK).json({"user":user})
}

const createUser = async (req,res) =>{
    const {name,password,email,role} = req.body
    if(role == roles.ADMIN){
        throw new BadRequestError("can not create admin user")
    }
    const user = await User.create({name,password,email,role})
    res.status(statusCodes.CREATED).json({"user":user.name,"email":user.email,"role":user.role})
}
const deleteUser = async (req,res) =>{
    const id = req.params.id
    const user = await User.findById(id)
    if(!user){
        throw new NotFoundError(`user with id ${id} not found`)
    }
    if(user.role == roles.ADMIN){
        throw new BadRequestError("can not delete admin user")
    }
    await user.deleteOne()
    res.status(statusCodes.OK).json({"msg":"user deleted successfully"})
}
module.exports = {getAllUsers,getUser,createUser,deleteUser}