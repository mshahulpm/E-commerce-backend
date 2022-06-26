import { NextFunction, Request, Response } from "express";
import { createUser, getOneUserByEmail, verifyUser } from "../../db.services/user";
import { comparePassword, hashPassword } from "../../utils/bcrypt";
import { signToken } from "../../utils/jwt";




export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;
        const user = await getOneUserByEmail(email);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        const isValid = await comparePassword(password, user.password);
        if (!isValid) {
            return res.status(403).json({
                message: 'Invalid password'
            })
        }
        const accessToken = await signToken({
            userId: user.userId,
            role: user.roles,
            email: user.email
        })
        // @ts-ignore
        delete user?.password;
        return res.status(200).json({
            message: 'Login successful',
            accessToken,
            user
        })

    } catch (error) {
        next(error);
    }
}


export async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;
        const user = await getOneUserByEmail(email);
        if (user) {
            return res.status(409).json({
                message: 'User already exists'
            })
        }
        const hashedPassword = await hashPassword(password);
        const newUser = await createUser({
            email,
            password: hashedPassword
        })
        const accessToken = await signToken({
            userId: newUser.userId,
            role: newUser.roles,
            email: newUser.email
        });
        res.status(201).json({
            message: 'Otp send successfully',
            accessToken
        })
    } catch (error) {
        next(error);
    }
}



export function sendOtp(req: Request, res: Response, next: NextFunction) {

    const user = req.user
    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }
    res.status(200).json({
        message: 'Otp sent successfully'
    })
}



export async function verifyOtp(req: Request, res: Response, next: NextFunction) {
    const user = req.user
    const otp = req.body.otp
    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }
    if (otp === '12345') {
        const verifiedUser = await verifyUser(user.userId)
        res.status(200).json({
            message: 'Email verified successfully'
        })
    } else {
        return res.status(400).json({
            message: 'Invalid otp'
        })
    }

}