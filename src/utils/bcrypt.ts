import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';


export async function hashPassword(password: string) {
    return await bcrypt.hash(password, +process.env.SALT_ROUNDS!);
}


export async function comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
}