import mongoose  from "mongoose";

const ExpancesSchema = new mongoose.Schema(
    {
        Details: {
            type: String,
            required: true,
            trim: true
        },
        Amount: {
            type: Number,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true,
            enum: [
                "Food",
                "Travel",
                "Accomodation",
                "Other"
            ]
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }
    , { timestamps: true });
export const Expenses = mongoose.model("Expenses", ExpancesSchema);