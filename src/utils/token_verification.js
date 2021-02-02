"use strict";

import jwt from 'jsonwebtoken';
import Response from './response';
import models from '../database/models';

const { Staff } = models;

class TokenVerification {

    //  Ordinary Staff Token Verification.
    static staffTokenVerification = async (req, res, next) => {
        try {

            //  Get the token from the "Header, Query or Body" if available.
            const token = req.headers.authorization ||
                req.headers['x-access-token'] ||
                req.query.token ||
                req.body.token;

            if (!token) {
                const response = new Response(
                    false,
                    401,
                    "Unauthorized, you did not provide any token."
                );
                return res.status(response.code).json(response);
            }

            //  Get the Staff "id".
            const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

            //  If Token exist, then make sure that the respective Staff exists in the DB.
            const staff = await Staff.findOne({
                where: { id },
                attributes: {
                    exclude: ['staff_password']
                }
            });

            if (!staff) {
                const response = new Response(
                    false,
                    401,
                    "Unauthorized, this staff does not exist.",
                );
                return res.status(response.code).json(response);
            }

            //  Now append the decoded token to the the request body.
            req.requestPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
            return next();

        }catch (error) {
            const response = new Response(
                false,
                401,
                "Unauthorized, you have an invalid token."
            );
            return res.status(response.code).json(response);
        }
    };

    //  Admin Staff Token Verification.
    static adminTokenVerification = (role) => async (req, res, next) => {
        try {

            const token = req.headers.authorization ||
                req.headers['x-access-token'] ||
                req.query.token ||
                req.body.token;
            if (!token) {
                const response = new Response(
                    false,
                    401,
                    "Unauthorized, you did not provide any token."
                );
                return res.status(response.code).json(response);
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

            //  Check if the user have the role of an "Admin".
            const staff = await Staff.findOne({ where: { id: decodedToken.id } });
            if (!role || staff.staff_role !== role) {
                const response = new Response(
                    false,
                    401,
                    `Only ${ role } is authorized to perform this operation. Please contact an ${ role }`
                );
                return res.status(response.code).json(response);
            }

            //  Now append the decoded token to the the request body.
            req.requestPayload = decodedToken;
            return next();

        }catch (error) {
            const response = new Response(
                false,
                401,
                "Unauthorized, you have an invalid token."
            );
            return res.status(response.code).json(response);
        }
    };

    //  Other Token Verification.
    static others = async (req, res, next) => {
        try {

            const token = req.headers.authorization ||
                req.headers['x-access-token'] ||
                req.query.token ||
                req.body.token;

        }catch (error) {
            const response = new Response(
                false,
                401,
                "Unauthorized, you have an invalid token."
            );
            return res.status(response.code).json(response);
        }
    };
}
export default TokenVerification;
