"use strict";

import { Router } from 'express';
import LeadsController from '../controllers/leads_controller';
import TokenVerification from "../utils/token_verification";

//  Set Up Express Router.
const leadsRouter = Router();


// Create a single Lead.
leadsRouter.post("/create_lead",
    TokenVerification.staffTokenVerification,
    LeadsController.createLead
);

//  Get all Leads.
leadsRouter.get("/all_leads",
    TokenVerification.staffTokenVerification,
    LeadsController.getAllLeads
);

//  Get a single Lead.
leadsRouter.get("/single_lead/:id",
    TokenVerification.staffTokenVerification,
    LeadsController.getSingleLead
);

//  Update a Lead.
leadsRouter.put("/update_lead/:id",
    TokenVerification.staffTokenVerification,
    LeadsController.updateLead
);

//  Delete a Lead.
leadsRouter.delete("/delete_lead/:id",
    TokenVerification.staffTokenVerification,
    LeadsController.deleteLead
);

export default leadsRouter;
