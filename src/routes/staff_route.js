"use strict";

import { Router } from 'express';
import StaffController from "../controllers/staff_controller";
import TokenVerification from "../utils/token_verification";

//  Set up Express ROuter.
const staffRouter = Router();


//  Create a single staff.
staffRouter.post("/create_staff",
    TokenVerification.adminTokenVerification("Admin"),
    StaffController.createStaff
);

//  Get all Staff.
staffRouter.get("/all_staff",
    StaffController.getAllStaff
);

//  Get a single Staff.
staffRouter.get("/single_staff/:id",
    StaffController.getSingleStaff
);

//  Update a Staff.
staffRouter.put("/update_staff/:id",
    TokenVerification.staffTokenVerification,
    StaffController.updateStaff
);

//  Delete a Staff.
staffRouter.delete("/delete_staff/:id",
    TokenVerification.adminTokenVerification("Admin"),
    StaffController.deleteStaff
);


//  SignUp a Staff.
staffRouter.post("/signup", StaffController.signUpStaff);

//  SignUp a Staff.
staffRouter.post("/login", StaffController.loginStaff);

export default staffRouter;
