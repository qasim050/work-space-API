const mongoose = require("mongoose")

const sessionSchema = mongoose.Schema({
    space:{
        type : mongoose.Types.ObjectId,
        ref : "Space",
        required: true
    },client: {
        type :String,
        required : [true,"pleass provide client name"]
    }
    ,
    createdBy:{
        type : mongoose.Types.ObjectId,
        ref : "User",
        required: true
    },
    startAt : {
        type : Date,
        required :true,
        default: Date.now
    },
    duration: {
       type: Number
    },
    endAt : {
        type : Date,
    },
    totalPrice : {
        type : Number,
    },
    status: {
        type:String,
        required:true,
        enum : ["open","close"],
        default:"open"
    }
},{timestamps: true})
sessionSchema.methods.getDuration = function () {
    const durationMs = this.endAt - this.startAt
    const duration = Math.ceil( durationMs / 1000 / 60)
    return duration /60
}
sessionSchema.methods.getTotalPrice = function () {
    const totalPrice = this.duration * this.space.pricePerHour
    return totalPrice
}
module.exports = mongoose.model("Session",sessionSchema)