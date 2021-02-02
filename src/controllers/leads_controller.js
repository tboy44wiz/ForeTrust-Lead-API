"use strict";

import Response from '../utils/response';
import models from '../database/models';
import JoiValidator from "../utils/joi_validator";

const { Leads } = models;

class LeadsController {

    //  Create a single Lead.
    static createLead = async (req, res) => {
        try {

            const payload = req.requestPayload;
            const {id: staff_id } = payload;
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = JoiValidator.leadSchema.validate({ ...requestBody, staff_id });
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Check if Lead already exist and create a new Lead using the "value" gotten from the validated object.
            const [lead, created] = await Leads.findOrCreate({
                where: {
                    // staff_id: staff_id,
                    leads_phone: requestBody.leads_phone,
                },
                defaults: { ...value }
            });
            if (!created) {
                const response = new Response(
                   false,
                   409,
                   "Lead already exist."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                "Successfully created a lead.",
                { lead }
            );
            return res.status(response.code).json(response);

        } catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later.",
            );
            return res.status(response.code).json(response);
        }
    };

    //  Get all Leads.
    static getAllLeads = async (req, res) => {
        try {

            const leads = await Leads.findAll();

            if (!leads.length) {
                const response = new Response(
                    false,
                    404,
                    "No lead found.",
                    { leads }
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Leads retrieved successfully.",
                { leads },
            );
            return res.status(response.code).json(response);

        }catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later.",
            );
            return res.status(response.code).json(response);
        }
    };

    //  Get a single Lead.
    static getSingleLead = async (req, res) => {
        try {

            const { id } = req.params;

            const lead = await Leads.findOne({ where: { id } });

            if (!lead) {
                const response = new Response(
                    false,
                    404,
                    "No lead found.",
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Lead retrieved successfully.",
                { lead }
            );
            return res.status(response.code).json(response);

        }catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later.",
            );
            return res.status(response.code).json(response);
        }
    };

    //  Update a Lead.
    static updateLead = async (req, res) => {
        try {

            const { id } = req.params;
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = JoiValidator.leadUpdateSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  If No record found with the same phone number, then update.
            const updatedLead = await Leads.update({ ...value }, { where: { id } });
            if (updatedLead[0] === 0) {
                const response =  new Response(
                    false,
                    400,
                    "Failed to update lead."
                );
                return res.status(response.code).json(response);
            }

            //  Get All the Leads again.
            const leads = await Leads.findAll();

            if (!leads.length) {
                const response = new Response(
                    false,
                    404,
                    "No lead found.",
                    { leads }
                );
                return res.status(response.code).json(response);
            }

            const response =  new Response(
                true,
                200,
                "Lead updated successfully.",
                { leads },
            );
            return res.status(response.code).json(response);

        }catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later.",
            );
            return res.status(response.code).json(response);
        }
    };

    //  Delete a Lead.
    static deleteLead = async (req, res) => {
        try {

            const { id } = req.params;

            const isDeleted = await Leads.destroy({ where: { id } });

            if (isDeleted !== 1) {
                const response = new Response(
                    false,
                    404,
                    "No lead found."
                );
                return res.status(response.code).json(response);
            }

            //  Get All the Leads again.
            const leads = await Leads.findAll();

            if (!leads.length) {
                const response = new Response(
                    false,
                    404,
                    "No lead found.",
                    { leads }
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Lead deleted successfully.",
                { leads },
            );
            return res.status(response.code).json(response);

        }catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later.",
            );
            return res.status(response.code).json(response);
        }
    };
}

export default LeadsController;
