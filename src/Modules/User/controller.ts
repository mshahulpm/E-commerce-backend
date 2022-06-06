import { NextFunction, Request, Response } from "express";
import { signToken } from "../../middlewares/jwt";
import { UserRole, UserRoleKey } from "../../types/common";

export const UserController = {

      login: async (req: Request, res: Response, next: NextFunction) => {

            try {
                  const token = await signToken({
                        id: 1,
                        name: 'John Doe',
                        role: UserRoleKey.role_1
                  });
                  res.status(200).json({
                        token
                  });
            } catch (error) {
                  next(error);
            }

      }

}