import { Trips } from "../models/Trips.models.js";
import { asyncHandler } from "../utils/asyncHeandler.js";
import { ApiError } from "../utils/ApiError.js";

const createTrip = asyncHandler(async (req, res) => {
    const { Destination, Source, FromDate, ToDate } = req.body;
    if (!Destination || !Source || !FromDate || !ToDate) {
        throw new ApiError(400, "Please provide all fields");
    }
    if(FromDate > new Date()) {
        throw new ApiError(400, "FromDate cannot be in the future");
    }
    if(ToDate > new Date()) {
        throw new ApiError(400, "ToDate cannot be in the future");
    }
    if(FromDate > ToDate) {
        throw new ApiError(400, "FromDate cannot be greater than ToDate");
    }
    const trip = await Trips.create({
        Destination,
        Source,
        FromDate,
        ToDate
    })

    console.log("Trip : ", trip);
    return res
    .status(200)
    .json({
        success: true,
        message: "Trip create successful",
        data: { trip },
      });
    })


const deleteTrip = asyncHandler(async (req, res) => {
    await Trips.findByIdAndDelete(req.params.id);
    return res
    .status(200)
    .json({
        success: true,
        message: "Trip delete successful",
      });

}) 

export { createTrip,
    deleteTrip
  };