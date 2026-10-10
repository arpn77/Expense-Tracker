import express from 'express';
import { createTrip,
    deleteTrip
 } from '../controllers/Trips.controller.js';

const router = express.Router();
router.route("/create").post(createTrip)
router.route("/delete").delete(deleteTrip)

export default router;