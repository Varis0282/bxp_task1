import mongoose, { Schema } from "mongoose";

const stationSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    startStation:{
        type: Boolean,
        required: true
    },
    endStation:{
        type: Boolean,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
})

export default mongoose.model('Station', stationSchema);