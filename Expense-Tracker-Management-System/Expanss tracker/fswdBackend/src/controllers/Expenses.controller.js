import { asyncHandler } from "../utils/asyncHeandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { Expenses } from "../models/Expense.models.js";

const expanceCreate = asyncHandler(async (req, res) => {
    const { Details, Amount, category, date } = req.body;
    if (!Details || !Amount || !category) {
        throw new ApiError(400, "Please provide all fields");
    }
    if(date > new Date()) {
        throw new ApiError(400, "Date cannot be in the future");
    }
    if (Amount < 0) {
        throw new ApiError(400, "Amount cannot be negative");
    }
    const expance = await Expenses.create({
        Details,
        Amount,
        category,
        date
    });
    console.log("Expance : ", expance);
    
    return res.status(200).json({
        success: true,
        message: "Expance create successful",
        data: { expance },
      });
})

const deleteExpance = asyncHandler(async (req, res) => {
    await Expenses.findByIdAndDelete(req.params.id);
    return res
    .status(200)
    .json({
        success: true,
        message: "Expance delete successful",
      });
});

export { expanceCreate,
    deleteExpance
 };