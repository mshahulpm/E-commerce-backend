import jwt from "jsonwebtoken";



export const signToken = async (payload: any) => {

    return await jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' },);
}
