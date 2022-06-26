import { generateResponseSchema } from "./utils";



export const errorSchema = generateResponseSchema(
    {
        type: "object",
        properties: {
            message: {
                type: "string"
            }
        }
    }
)

export const commonMessageSchema = generateResponseSchema(
    {
        type: "object",
        properties: {
            message: {
                type: "string"
            }
        }
    }
)