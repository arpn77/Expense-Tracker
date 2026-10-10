import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
    {
        Destination: {
            type: String,
            required: true,
            trim : true,
        },
        Source: {
            type: String,
            required: true,
            trim : true,
        },
        FromDate: {
            type: Date,
            required: true,
        },
        ToDate: {
            type: Date,
            required: true,
        },

    }
    , { timestamps: true });

export const Trips= mongoose.model("Trips", tripSchema);