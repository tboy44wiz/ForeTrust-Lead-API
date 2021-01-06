"use strict";

import Joi from 'joi';


const roles = ['Admin', 'Employee'];
const location = ['Enugu', 'Lagos'];

class JoiValidator {

    //  Lead Validation Schema.
    static leadSchema = Joi.object({
        staff_id: Joi.string().required(),
        leads_name: Joi.string().required().min(3),
        leads_phone: Joi.string().required(),
        leads_address: Joi.string(),
        leads_state: Joi.string().required(),
        purpose: Joi.string()
    });

    //  Lead Validation Schema.
    static leadUpdateSchema = Joi.object({
        staff_id: Joi.string(),
        leads_name: Joi.string().min(3),
        leads_phone: Joi.string(),
        leads_address: Joi.string(),
        leads_state: Joi.string(),
        purpose: Joi.string()
    });


    //  Staff Validation Schema.
    static staffSchema = Joi.object({
        staff_name: Joi.string().required().min(3),
        staff_email: Joi.string().required().email(),
        staff_phone: Joi.string().required(),
        staff_password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric.")),
        staff_location: Joi.string().required().valid(...location),
        staff_role: Joi.string().valid(...roles)
    });

    //  Staff Update Validation Schema.
    static staffUpdateSchema = Joi.object({
        staff_name: Joi.string().min(3),
        staff_email: Joi.string().email(),
        staff_phone: Joi.string(),
        staff_password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric.")),
        staff_location: Joi.string().valid(...location),
        staff_role: Joi.string().valid(...roles)
    });

    //  Staff Login Schema.
    static staffLoginSchema = Joi.object({
        staff_email: Joi.string().required().email(),
        staff_password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .error(new Error("Password must be at least 6 characters and alphanumeric."))
    });
}
export default JoiValidator;
