"use strict";

import Joi from 'joi';


const roles = ['Admin', 'Employee'];
const location = ['Enugu', 'Lagos'];
const source = ['Select Source', 'Friends', 'Email', 'FaceBook', 'Twitter', 'Instagram', 'WhatsApp', 'Television', 'Radio', 'Others'];
const contact_mode = ['None', 'Call', 'Text Message', 'Zoom', 'WhatsApp', 'Email', 'Physical Meetup', 'Others'];
const status = ['Dormant', 'In progress', 'Done'];

class JoiValidator {

    //  Lead Validation Schema.
    static leadSchema = Joi.object({
        staff_id: Joi.string().required().uuid(),
        staff_name: Joi.string().required(),
        leads_name: Joi.string().required().min(3),
        leads_phone: Joi.string().required(),
        leads_email: Joi.string().allow(""),
        leads_address: Joi.string().allow(""),
        leads_state: Joi.string().required(),
        leads_source: Joi.string().required().valid(...source),
        purpose: Joi.string(),
        status: Joi.string().valid(...status),
        note: Joi.any()
    });

    //  Lead Update Validation Schema.
    static leadUpdateSchema = Joi.object({
        staff_id: Joi.string().uuid(),
        staff_name: Joi.string(),
        leads_name: Joi.string().min(3),
        leads_phone: Joi.string(),
        leads_email: Joi.string().email(),
        leads_address: Joi.string().allow(""),
        leads_state: Joi.string().allow(""),
        leads_source: Joi.string().valid(...source),
        purpose: Joi.string(),
        status: Joi.string().valid(...status),
        note: Joi.string()
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


    //  Note Validation Schema.
    static noteSchema = Joi.object({
        staff_id: Joi.string().required().uuid(),
        staff_name: Joi.string().required(),
        leads_id: Joi.string().required().uuid(),
        note: Joi.string().required(),
        // contact_mode: Joi.string().valid(...contact_mode),
    });

    //  LNote Update Validation Schema.
    static noteUpdateSchema = Joi.object({
        staff_id: Joi.string().required().uuid(),
        leads_id: Joi.string().required().uuid(),
        note: Joi.any(),
        // contact_mode: Joi.string().valid(...contact_mode),
    });
}
export default JoiValidator;
