import jwt from "jsonwebtoken";



export const signToken = async (payload: any) => {

    return await jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' },);
}


export const verifyToken = async (token: string) => {

    return await jwt.verify(token, process.env.JWT_SECRET!);
}

export const decodeToken = async (token: string) => {

    return await jwt.decode(token);
}