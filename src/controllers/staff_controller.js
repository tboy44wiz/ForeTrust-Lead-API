"use strict";

import Response from "../utils/response";
import models from '../database/models';
import JoiValidator from "../utils/joi_validator";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const { Staff, Leads } = models;

class StaffController {

    //  Create a single staff.
    static createStaff = async (req, res) => {
        try {

            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.staffSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Check if Staff already exist and create a new Staff using the "value" gotten from the validated object.
            const [staff, created] = await Staff.findOrCreate({
                where: { staff_email: requestBody.staff_email },
                defaults: { ...value } //  "value" is gotten from the validated object.
            });

            if (!created) {
                const response = new Response(
                    false,
                    409,
                    "Staff already exist."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                "Successfully created a staff.",
                { staff }
            );
            return res.status(response.code).json(response);

        }catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later."
            );
            res.status(response.code).json(response);
        }
    };

    //  Get all Staff.
    static getAllStaff = async (req, res) => {
        try {

            const staff = await Staff.findAll({
                attributes: {
                    exclude: ['staff_password']
                }
            });
            if (!staff) {
                const response = new Response(
                    false,
                    404,
                    "No staff found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Staff retrieved successfully.",
                { staff }
            );
            return res.status(response.code).json(response);

        }catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later."
            );
            res.status(response.code).json(response);
        }
    };

    //  Get a single Staff.
    static getSingleStaff = async (req, res) => {
        try {

            const { id } = req.params;

            const staff = await Staff.findOne({
                where: { id },
                attributes: {
                    exclude: ['staff_password']
                }
            });
            if (!staff) {
                const response = new Response(
                    false,
                    404,
                    "No staff found.",
                );
                return res.status(response.code).json(response);
            }

            //  Get All Leads by this staff.
            const leadsByThisStaff = await Leads.findAll({
                where: { staff_id: id },
                attributes: {
                    exclude: [
                        'id', 'staff_id', 'staff_name', 'leads_name', 'leads_phone', 'leads_email', 'leads_address',
                        'leads_state', 'leads_source', 'purpose', 'createdAt', 'updatedAt'
                    ]
                },
            });

            const closedLead = leadsByThisStaff.filter((lead) => {
                return (lead['status'] === "Done");
            })
            const dormantLead = leadsByThisStaff.filter((lead) => {
                return (lead['status'] === "Dormant");
            })
            const inProgressCount = leadsByThisStaff.filter((lead) => {
                return (lead['status'] === "In progress");
            })

            const response = new Response(
                true,
                200,
                "Staff retrieved successfully.",
                {
                    ...staff.dataValues,
                    openedLead: leadsByThisStaff.length,
                    closedLead: closedLead.length,
                    inProgressLead: inProgressCount.length,
                    dormantLead: dormantLead.length,
                }
            );
            return res.status(response.code).json(response);

        }catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later."
            );
            res.status(response.code).json(response);
        }
    };

    //  Update a Staff.
    static updateStaff = async (req, res) => {
        try {

            const payload = req.requestPayload;
            const { id } = req.params;
            const requestBody = req.body;
            console.log(payload.staff_role);

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.staffUpdateSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  First check if a record has the staff_email existing.
            const foundItem = await Staff.findOne({
                where: { staff_email: value.staff_email }
            });
            if (foundItem) {
                const response =  new Response(
                    false,
                    409,
                    "This email address already exist. Kindly use another email address."
                );
                return res.status(response.code).json(response);
            }

            //  If No record found with the same staff email, then update.
            const updatedStaff = await Staff.update({ ...value }, { where: { id } });

            if (updatedStaff[0] === 0) {
                const response =  new Response(
                    false,
                    400,
                    "Failed to update staff."
                );
                return res.status(response.code).json(response);
            }

            const response =  new Response(
                true,
                200,
                "Staff updated successfully."
            );
            return res.status(response.code).json(response);

        }catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later."
            );
            res.status(response.code).json(response);
        }
    };

    //  Delete a Staff.
    static deleteStaff = async (req, res) => {
        try {

            const { id } = req.params;

            const isDeleted = await Staff.destroy({ where: { id } });

            if (isDeleted !== 1) {
                const response = new Response(
                    false,
                    404,
                    "No staff found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Staff deleted successfully."
            );
            return res.status(response.code).json(response);

        }catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later."
            );
            res.status(response.code).json(response);
        }
    };



    //  Staff SignUp.
    static signUpStaff = async (req, res) => {
        try {

            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.staffSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Check if Staff already exist and create a new Staff using the "value" gotten from the validated object.
            const [staff, created] = await Staff.findOrCreate({
                where: { staff_email: requestBody.staff_email },
                defaults: { ...value } //  "value" is gotten from the validated object.
            });
            if (!created) {
                const response = new Response(
                    false,
                    409,
                    "Staff already exist."
                );
                return res.status(response.code).json(response);
            }

            const { id, staff_name, staff_email, staff_phone, staff_location, staff_role } = staff;

            //  Create a Token that will be passed to the response.
            const token = await jwt.sign(
                { id, staff_name, staff_email, staff_phone, staff_role },
                `${ process.env.JWT_SECRET_KEY }`,
                { expiresIn: "1d" }
            );

            const formattedResponse = {
                id,
                staff_name,
                staff_email,
                staff_phone,
                staff_location,
                staff_role,
                token
            }

            const response = new Response(
                true,
                201,
                "Successfully created a staff.",
                { staff: formattedResponse }
            );
            return res.status(response.code).json(response);

        }catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later."
            );
            res.status(response.code).json(response);
        }
    };

    //  Staff Login.
    static loginStaff = async (req, res) => {
        try {

            const requestBody = req.body;
            console.log(requestBody);

            //  Validate the Request Body.
            const { error, value } = await JoiValidator.staffLoginSchema.validate(requestBody);
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            const staff = await Staff.findOne({
                where: { staff_email: value.staff_email }
            });

            if (!staff) {
                const response = new Response(
                    false,
                    404,
                    "Email or Password is not correct."
                );
                return res.status(response.code).json(response);
            }

            //  Compare the encrypted staff_password.
            const isPasswordMatched = bcrypt.compareSync(value.staff_password, staff.staff_password );
            if (!isPasswordMatched) {
                const response = new Response(
                    false,
                    401,
                    "Incorrect password. Check your password or click 'forget password'."
                );
                return res.status(response.code).json(response);
            }

            const { id, staff_name, staff_email, staff_phone, staff_location, staff_role } = staff;

            //  Create a Token that will be passed to the response.
            const token = await jwt.sign(
                { id, staff_name, staff_email, staff_phone, staff_role },
                `${ process.env.JWT_SECRET_KEY }`,
                { expiresIn: "1d" }
            );

            const formattedResponse = {
                id,
                staff_name,
                staff_email,
                staff_phone,
                staff_location,
                staff_role,
                token
            }

            const response = new Response(
                true,
                200,
                "You're logged in successfully.",
                { staff: formattedResponse }
            );
            res.status(response.code).json(response);

        }catch (error) {
            console.log(`ERROR::: ${ error }`);
            const response = new Response(
                false,
                500,
                "Server error, please try again later."
            );
            res.status(response.code).json(response);
        }
    };
}

export default StaffController;
