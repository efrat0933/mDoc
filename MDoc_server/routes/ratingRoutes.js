import { Router } from 'express';

import {calcRating} from "../controllers/ratingController.js";

const router = Router();

router.use(function (req, res, next) {
    console.log('Someone entered to help in time: ', Date.now());
    next();
  });
  
router.post('/calcRating', calcRating);


export default router;