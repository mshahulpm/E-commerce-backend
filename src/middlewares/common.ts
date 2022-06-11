import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { decodeToken } from "../utils/jwt";
import { Prisma } from "@prisma/client";
import { UserRole } from "src/types/common";




export function notFound404(req: Request, res: Response, next: NextFunction) {
    res.status(404).json({
        message: 'Not Found'
    })

}


export function error500(err: any, req: Request, res: Response, next: NextFunction) {
    console.log('Error: ', err);
    res.status(err.status || 500).json(
        process.env.NODE_ENV !== 'production' ?
            {
                message: err.message,
                stack: err.stack
            }
            : { message: err.message, }
    )
}

export function logger(req: Request, res: Response, next: NextFunction) {
    if (process.env.NODE_ENV === 'production') return next();
    console.log('Request: ', req.method, req.url);
    next();
}


export async function getUserDetails(req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return next();
    try {
        const user = await decodeToken(token)
        // @ts-ignore
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }

}

export function JoiValidator(schema?: Joi.Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!schema) return next();
        const result = schema.validate({
            ...req.body,
            ...req.query,
            ...req.params
        });
        if (result.error) {
            return res.status(400).json({
                message: result.error.message,
                errors: result.error
            })
        }
        next();
    }
}


export function accessControl(role: UserRole[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!user) return res.status(401).json({
            message: 'Unauthorized'
        })
        if (!role.includes(user?.role)) return res.status(403).json({
            message: 'Forbidden resource'
        })
        next();
    }
}


export function isAuthorized(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    if (!user) return res.status(401).json({
        message: 'Unauthorized'
    })
    next();
}