import { NextFunction, Request, Response } from "express";
import { comparePassword, hashPassword } from "../../utils/bcrypt";
import { getOneUserById, updateUser } from "../../db.services/user";



export async function userBasicUpdate(req: Request, res: Response, next: NextFunction) {

      const userId = req.user!.userId;
      try {
            const updatedUser = await updateUser(userId, req.body);
            res.status(200).json({
                  message: 'Basic info updated successfully',
                  updatedUser
            })
      } catch (error) {
            next(error);
      }
}


export async function changePassword(req: Request, res: Response, next: NextFunction) {
      const userId = req.user!.userId;
      const { oldPassword, newPassword } = req.body;
      try {
            const oldPasswordFromDB = (await getOneUserById(userId))!.password;
            if (!(await comparePassword(oldPassword, oldPasswordFromDB))) {
                  return res.status(401).json({
                        message: 'Invalid old password'
                  })
            }
            const hashedPassword = await hashPassword(newPassword);
            await updateUser(userId, { password: hashedPassword });
            res.status(200).json({
                  message: 'Password changed successfully'
            })
      } catch (error) {
            next(error);
      }
}

