const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require('bcryptjs');

// password = '123456'
const demoPassword = process.env.DEMO_PASSWORD || '$2a$10$i1heFGq1IMkouakXOtpeTOmgu1MtCwz9jMcnuJxtKmP9dX27mUD06'

async function main() {

    const user = await prisma.user.create({
        data: {
            email: process.env.EMAIL,
            firstName: 'Mohammed',
            lastName: 'Shahul',
            password: demoPassword,
            roles: 'ADMIN',
            emailVerified: true,
        }
    })
    console.log(user)
}

main()

