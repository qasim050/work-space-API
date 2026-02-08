const Space = require("../models/space")
const statusCodes = require("http-status-codes")

const getAllSpaces = async (req,res) =>{
    const spaces = await Space.find()
    return res.status(statusCodes.OK).json({Spaces:spaces})
}
const getSpace = async (req,res) =>{
    const space = await Space.findById({_id:req.params.id})
    return res.status(statusCodes.OK).json({Space:space})
}
const createSpace = async (req,res) =>{
    const space = await Space.create(req.body)
    return res.status(statusCodes.CREATED).json(space)
}
const updateSpace = async (req,res) =>{
    const space = await Space.findByIdAndUpdate({_id:req.params.id},req.body,
        {new:true,runValidators:true})
    return res.status(statusCodes.OK).json(space)
}
const deleteSpace = async (req,res) =>{
    const space = await Space.findByIdAndDelete({_id:req.params.id})
    return res.status(statusCodes.OK).json(space)
}
module.exports = {getAllSpaces,getSpace,createSpace,updateSpace,deleteSpace}