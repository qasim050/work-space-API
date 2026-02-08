const mongoose = require("mongoose")

const spaceSchema = mongoose.Schema({
    name:{
        type : String,
        required : true,
        unique: true,
},
    pricePerHour:{
        type : Number,
        required: true
    },
    isActive : {
        type : Boolean,
        default :true
    }

})
module.exports = mongoose.model("Space", spaceSchema)