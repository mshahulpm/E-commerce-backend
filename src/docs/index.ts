import { assetDoc } from "./asset"


export const swaggerConfig = {
    "openapi": "3.0.2",
    "info": {
        "title": "E-commerce backend Api documentation",
        "description": "Complete Api documentation for E-commerce backend consumption for Admin panel and storefront",
        "version": "1.0.0"
    },
    "servers": [
        {
            "url": "http://localhost:8000"
        }
    ],
    "tags": [
        {
            "name": "Auth",
            "description": "Authentication and authorization",
        },
        {
            "name": "Asset",
            "description": "Image upload and modification",
        },
        {
            "name": "User",
            "description": "User Module"
        },
        {
            "name": "Cart",
            "description": "Cart Module"
        },
        {
            "name": "Category",
            "description": "Category Module"
        },
        {
            "name": "Mail",
            "description": "Mail Module"
        },
        {
            "name": "Order",
            "description": "Order Module"
        },
        {
            "name": "Product",
            "description": "Product Module"
        },

    ],
    "paths": {
        ...assetDoc.paths,
    },
    "components": {
        "schemas": {
            ...assetDoc.schema,
        },
        "requestBodies": {
            "Pet": {
                "description": "Pet object that needs to be added to the store",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/Pet"
                        }
                    },
                    "application/xml": {
                        "schema": {
                            "$ref": "#/components/schemas/Pet"
                        }
                    }
                }
            },
            "UserArray": {
                "description": "List of user object",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/components/schemas/User"
                            }
                        }
                    }
                }
            }
        },
        "securitySchemes": {
            "bearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT",
                "in": "header",
                "name": "Authorization",
                "description": "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\""
            }
        }
    },
    "security": [
        { "bearerAuth": [] }
    ],
}