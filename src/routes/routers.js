"use strict";

import { Router } from 'express';
import leadsRouter from './leads_route';
import staffRouter from "./staff_route";


const router = Router();

router.use("/lead", leadsRouter);
router.use("/staff", staffRouter);


export default router;
