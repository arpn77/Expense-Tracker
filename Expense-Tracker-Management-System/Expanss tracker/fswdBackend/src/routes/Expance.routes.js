import express from 'express';
import { expanceCreate,
    deleteExpance
 } from '../controllers/Expenses.controller.js';

const router = express.Router();
router.route("/create").post(expanceCreate)
router.route("/delete/:id").delete(deleteExpance)
export default router;