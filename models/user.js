const bcrypt = require("bcryptjs")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const roles = require("../config/constants")
const mongoose = require("mongoose")
const { required } = require("joi")
const userSchema = mongoose.Schema({
    name : {
        type:String,
        required : [true,"please provide name"],
        maxLength: 30,
        minLength: 3,
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    role : {
        type:String,
        required:false,
        default:roles.MANAGER,
        enum: Object.values(roles)
    }
        
    })
    userSchema.pre("save", async function () {
        this.password = await bcrypt.hash(this.password,10)
        
    })
    userSchema.methods.createJWT = function () {
        return jwt.sign({userID:this._id,name:this.name,role: this.role},process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_LIFETIME})
        
    }
    userSchema.methods.comparePassword = async function (password) {
        return await bcrypt.compare(password,this.password)
    }
    module.exports = mongoose.model("User", userSchema)