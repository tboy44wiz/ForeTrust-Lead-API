"use strict";

import { Router } from 'express';

//  Import Router EndPoints
import leadsRouter from './leads_route';
import staffRouter from "./staff_route";
import noteRouter from "./note_route";


const router = Router();

router.use("/lead", leadsRouter);
router.use("/staff", staffRouter);
router.use("/note", noteRouter);


export default router;
