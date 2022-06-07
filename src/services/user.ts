import { PrismaClient, Prisma } from '@prisma/client'
import { Without } from 'types/common'
const { user, } = new PrismaClient()
const { Prisma__UserClient } = Prisma

export async function getOneUserByEmail(email: string) {
    return await user.findUnique({
        where: {
            email
        },
        select: {
            userId: true,
            email: true,
            password: true,
            roles: true,
            firstName: true,
            lastName: true,
            emailVerified: true,
        }
    })
}


export async function getOneUserById(id: string) {
    return await user.findUnique({
        where: {
            userId: id
        }
    })
}


export async function createUser(data: Prisma.UserCreateInput) {
    return await user.create({
        data
    })
}

export async function verifyUser(id: string) {
    return await user.update({
        where: {
            userId: id
        },
        data: {
            emailVerified: true
        }
    })
}


export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
    return await user.update({
        where: {
            userId: id
        },
        data
    })
}