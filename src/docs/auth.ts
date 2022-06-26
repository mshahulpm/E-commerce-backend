/**
 * Auth module documentation
 */

import { errorSchema, commonMessageSchema } from "./common"
import { generateResponseSchema } from "./utils"

const loginSchema = {
    "type": "object",
    "properties": {
        "email": {
            "type": "email",
            // "example": 10
        },
        "password": {
            "type": "string",
            "example": "198772"
        },
    }
}

const userSchema = {
    "type": "object",
    "properties": {
        email: {
            type: "email"
        },
        userId: {
            type: "string"
        },
        roles: {
            type: "string",
            enum: [
                "ADMIN",
                "USER",
                "SUB_ADMIN",
            ]
        },
        firstName: {
            type: 'string'
        },
        lastName: {
            type: "string"
        },
        emailVerified: {
            type: "boolean"
        }
    }
}

const loginResponseSchema = generateResponseSchema(
    {
        type: "object",
        properties: {
            message: {
                type: 'string'
            },
            accessToken: {
                type: 'string'
            },
            user: userSchema
        }
    }
)

const signupResponseSchema = generateResponseSchema(
    {
        type: "object",
        properties: {
            message: {
                type: 'string'
            },
            accessToken: {
                type: 'string'
            },
        }
    }
)


export const AuthDoc = {
    paths: {
        '/auth/login': {
            post: {
                tags: ['Auth'],
                description: "login route",
                "summary": "Login route for the application",
                "operationId": "Login",
                "requestBody": {
                    "content": {
                        "application/json": {
                            schema: loginSchema
                        }
                    }
                },
                responses: {
                    "200": loginResponseSchema,
                    "403": errorSchema,
                    "404": errorSchema,
                    "500": errorSchema,
                }
            }
        },
        '/auth/signup': {
            post: {
                tags: ['Auth'],
                description: "Signup route",
                "summary": "Signup route for the application",
                "operationId": "Signup",
                "requestBody": {
                    "content": {
                        "application/json": {
                            schema: loginSchema
                        }
                    }
                },
                responses: {
                    "201": signupResponseSchema,
                    "403": errorSchema,
                    "409": errorSchema,
                    "500": errorSchema,
                }
            }
        },
        '/auth/send-otp': {
            post: {
                tags: ['Auth'],
                description: "Send OTP",
                "summary": "Send otp to verify email",
                "operationId": "SendOTP",
                responses: {
                    "200": commonMessageSchema,
                    "403": errorSchema,
                    "409": errorSchema,
                    "500": errorSchema,
                }
            }
        },
        '/auth/verify-otp': {
            post: {
                tags: ['Auth'],
                description: "Verify OTP route",
                "operationId": "VerifyOTP",
                "requestBody": {
                    "content": {
                        "application/json": {
                            schema: {
                                type: 'object',
                                properties: {
                                    otp: {
                                        type: 'string',
                                        length: 5
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": commonMessageSchema,
                    "404": errorSchema,
                    "403": errorSchema,
                    "500": errorSchema,
                }
            }
        }
    }
}