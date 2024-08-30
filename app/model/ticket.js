import mongoose, { Schema } from 'mongoose';

const ticketSchema = new Schema({
    from: {
        type: String,
        ref: 'Station',
        required: true
    },
    to: {
        type: String,
        ref: 'Station',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    expiryTime: {
        type: Date,
        required: true
    },
    expired: {
        type: Boolean,
        default: false
    },
    entry: {
        type: Boolean
    },
    exit: {
        type: Boolean
    },
    entryTime: {
        type: Date
    },
    exitTime: {
        type: Date
    }
}, { timestamps: true });


export default mongoose.model('Ticket', ticketSchema);