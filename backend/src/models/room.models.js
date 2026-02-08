import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    roomNumber:{
        type:String,
        required:true,
        unique:true
    },
    floor:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RoomCategory",
        required:true
    },
    status:{
        type:String,
        enum:["available","maintenance",],
        default:"available"
    },
    cleaning_status:{
        type:String,
        enum:["clean","dirty","in-progress"],
        default:"clean" 
    },
    current_guest:{
        type:String,
        default:null
    }
},{timestamps:true});

export const Room = mongoose.model("Room", roomSchema);