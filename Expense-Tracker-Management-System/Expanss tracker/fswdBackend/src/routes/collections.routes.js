import express from 'express';
import { 
    updateCollection,
    deleteCollection
 } from '../controllers/collection.controller.js';

const router = express.Router();
router.route("/update/:id1/:id2").put(updateCollection);
router.route("/delete/:id1/:id2").delete(deleteCollection);
 
 export default router;