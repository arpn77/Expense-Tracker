import { User } from "../models/user.models.js";
import { Expenses } from "../models/Expense.models.js";
import { Trips } from "../models/Trips.models.js";
import { asyncHandler } from "../utils/asyncHeandler.js";
import { ApiError } from "../utils/ApiError.js";

const updateCollection = asyncHandler(async (req, res) => {
  const { id1, id2 } = req.params;
  const { type } = req.query;

  if (!["trip", "expense"].includes((type || "").toLowerCase())) {
    throw new ApiError(400, 'Query param "type" must be either "trip" or "expense"');
  }

  let childDoc;
  if (type === "trip") {
    childDoc = await Trips.findById(id2);
  } else {
    childDoc = await Expenses.findById(id2);
  }

  if (!childDoc) throw new ApiError(404, `${type} not found`);

  const fieldSet = type === "trip" ? "trip_id" : "expanse_id";

  const updatedUser = await User.findByIdAndUpdate(
    id1,
    { $addToSet: { [fieldSet]: childDoc._id } },
    { new: true, runValidators: true }
  );

  if (!updatedUser) throw new ApiError(404, "User not found");

  return res.status(200).json({
    success: true,
    message: `${type} added to collection successfully`,
    data: { user: updatedUser },
  });
});

const deleteCollection = asyncHandler(async (req, res) => {
  const { id1, id2 } = req.params;
  const { type } = req.query;

  if (!["trip", "expense"].includes((type || "").toLowerCase())) {
    throw new ApiError(400, 'Query param "type" must be either "trip" or "expense"');
  }

  const user = await User.findById(id1);
  if (!user) throw new ApiError(404, "User not found");

  let collectionDoc;
  if (type === "trip") {
    collectionDoc = await Trips.findById(id2);
  } else {
    collectionDoc = await Expenses.findById(id2);
  }

  if (!collectionDoc) throw new ApiError(404, `${type} not found`);

  const fieldSet = type === "trip" ? "trip_id" : "expanse_id";

  const updatedUser = await User.findByIdAndUpdate(
    id1,
    { $pull: { [fieldSet]: collectionDoc._id } },
    { new: true, runValidators: true }
  );

  if (type === "trip") {
    await Trips.findByIdAndDelete(id2);
  } else {
    await Expenses.findByIdAndDelete(id2);
  }

  return res.status(200).json({
    success: true,
    message: `${type} deleted and removed from collection successfully`,
    data: { user: updatedUser },
  });
});

export { updateCollection, deleteCollection };
