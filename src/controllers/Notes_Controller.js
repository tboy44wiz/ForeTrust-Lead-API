"use strict";

import Response from '../utils/response';
import JoiValidator from '../utils/joi_validator';
import models from '../database/models'

const { Notes } = models;

class NotesController {

    //  Create a single Note.
    static createNote = async (req, res) => {
        try {

            const payload = req.requestPayload;
            const { id: staff_id, staff_name } = payload;
            const requestBody = req.body;

            //  Validate the Request Body.
            const { error, value } = JoiValidator.noteSchema.validate({ ...requestBody, staff_id, staff_name });
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${ error.message }`
                );
                return res.status(response.code).json(response);
            }

            //  Create a Note.
            const note = await Notes.create({ ...value });
            if (!note) {
                const response = new Response(
                    false,
                    400,
                    "Failed to create note.",
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                201,
                "Note created successfully.",
                { note },
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

    //  Get all Notes for a Particular Lead.
    static getNotesForParticularLead = async (req, res) => {
        try {

            const { id } = req.params;

            const notes = await Notes.findAll({
                where: { leads_id: id }
            });
            if (!notes.length) {
                const response = new Response(
                    false,
                    404,
                    "No note found.",
                    { notes }
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Notes retrieved successfully.",
                { notes },
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

    //  Update a Note.
    static updateNote = async (req, res) => {
        try {

            const { id } = req.params;
            const payload = req.requestPayload;
            const { id: staffId, staff_role } = payload;
            const  requestBody = req.body;


            if (staff_role !== "Admin" && staffId !== requestBody.staff_id) {
                const response = new Response(
                    false,
                    401,
                    `You are not permitted to perform this action. Please contact an Admin.`
                );
                return res.status(response.code).json(response);
            }

            //  Validate the Request Body.
            const { error, value } = JoiValidator.noteUpdateSchema.validate({ ...requestBody });
            if (error) {
                const response = new Response(
                    false,
                    400,
                    `${error.message}`
                );
                return res.status(response.code).json(response);
            }

            //  Update Note.
            const updatedNote = await Notes.update({ ...value }, { where: { id } });
            if (updatedNote[0] === 0) {
                const response =  new Response(
                    false,
                    400,
                    "Failed to update note."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Note updated successfully.",
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

    //  Delete a Note.
    static deleteNote = async (req, res) => {
        try {

            const { id } = req.params;
            const payload = req.requestPayload;
            const { id: staffId, staff_role } = payload;
            const { leads_id, staff_id } = req.body;


            if (staff_role !== "Admin" && staffId !== staff_id) {
                const response = new Response(
                    false,
                    401,
                    `WOW! You are not permitted to perform this action. Please contact an Admin.`
                );
                return res.status(response.code).json(response);
            }

            const isDeleted = await Notes.destroy({ where: { id, leads_id } });
            if (isDeleted !== 1) {
                const response = new Response(
                    false,
                    404,
                    "No note found."
                );
                return res.status(response.code).json(response);
            }

            const response = new Response(
                true,
                200,
                "Note deleted successfully.",
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

    //  Default.
    static default = async (req, res) => {
        try {

            const response = new Response(
                true,
                200,
                "Leads retrieved successfully.",
                {  },
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

export default NotesController;
