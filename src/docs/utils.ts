


export function generateResponseSchema(schema: { [key: string]: any }) {

    return {
        content: {
            "application/json": {
                schema
            }
        }
    }
}

