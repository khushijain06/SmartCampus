const mongoose = require("mongoose")
const studentSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    name : String,
    rollNumber:String,
    class:String,
    section:String,
    gender:String,
    dob:Date,
    addres:{
        current:String,
        permanent:String,
    },
    parents:{
        father:String,
        mother:String,
        guardian:String,
        contact:String,
        email:String
    }
});
module.exports = mongoose.model("Student",studentSchema)