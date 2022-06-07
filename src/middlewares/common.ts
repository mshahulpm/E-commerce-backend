import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../utils/jwt";





export function notFound404(req: Request, res: Response, next: NextFunction) {
    const err = new Error('Not Found');
    res.status(404).json({
        message: 'Not Found'
    })

}


export function error500(err: any, req: Request, res: Response, next: NextFunction) {
    console.log('Error: ', err);
    res.status(500).json({
        message: err.message,
    })
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