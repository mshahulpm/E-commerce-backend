/**
 * Assets module documentation
 */

const assetSchema = {
    type: "object",
    properties: {
        "assetId": {
            "type": "string",
            "format": "cuid",
            "example": "cl4iondf700075kff606x9u9q"
        },
        "createdAt": {
            "type": "string",
            "format": "date-time",
            "example": "2022-06-17T16:46:07.934Z"
        },
        "updatedAt": {
            "type": "string",
            "format": "date-time",
            "example": "2022-06-17T16:46:07.934Z"
        },
        type: {
            "type": "string",
            "enum": [
                "product",
                "category_thumb",
                "category_banner",
                "home_banner"
            ],
            "example": "product"
        },
        urls: {
            type: "object",
            properties: {
                "large": {
                    "type": "string",
                    "example": "/images/banner/home/cl4iondf700075kff606x9u9q_large.png"
                },
                "medium": {
                    "type": "string",
                    "example": "/images/banner/home/cl4iondf700075kff606x9u9q_medium.png"
                },
                "mobile": {
                    "type": "string",
                    "example": "/images/banner/home/cl4iondf700075kff606x9u9q_mobile.png"
                }
            }
        }
    }
}


export const assetDoc = {
    "paths": {
        "/asset": {
            "get": {
                tags: ["Asset"],
                "summary": "get list of assets",
                "description": "get list of assets",
                "operationId": "getAssetsList",
                "parameters": [
                    {
                        "name": "orderBy",
                        "in": "query",
                        "description": "assets list order asc/desc default is desc according to created date",
                        "required": false,
                        "schema": {
                            "type": "string",
                            "enum": [
                                "asc",
                                "desc",
                            ]
                        }
                    },
                    {
                        "name": "limit",
                        "in": "query",
                        "description": "limit of assets to be returned",
                        "required": false,
                        "schema": {
                            "type": "number",
                            "format": "int64"
                        }
                    },
                    {
                        "name": "page",
                        "in": "query",
                        "description": "page no for the assets list",
                        "required": false,
                        "schema": {
                            "type": "number",
                            "format": "int64"
                        }
                    },
                    {
                        "name": "type",
                        "in": "query",
                        "description": "type of the assets",
                        "required": false,
                        "schema": {
                            "type": "string",
                            "enum": [
                                "product",
                                "category_thumb",
                                "category_banner",
                                "home_banner"
                            ]
                        }
                    },
                ],
                responses: {
                    "200": {
                        "description": "successful operation",
                        content: {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "page": {
                                            "type": "number",
                                            "format": "int64",
                                            "example": 1
                                        },
                                        "limit": {
                                            "type": "number",
                                            "format": "int64",
                                            "example": 10
                                        },
                                        "count": {
                                            "type": "number",
                                            "format": "int64",
                                            "example": 10
                                        },
                                        "assets": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/components/schemas/Asset"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                tags: ["Asset"],
                "summary": "delete multiple assets",
                "description": "delete multiple assets by type",
                "operationId": "deleteAssets",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "type": {
                                        "type": "string",
                                        "enum": [
                                            "product",
                                            "category_thumb",
                                            "category_banner",
                                            "home_banner"
                                        ],
                                        "required": true,
                                        "default": "product"
                                    },
                                    "assetIdes": {
                                        "type": "array",
                                        "items": {
                                            "type": "string"
                                        },
                                        "required": true,

                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        "description": "successful operation",
                        content: {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                            "example": "Assets deleted successfully"
                                        },
                                        "data": {
                                            "type": "object",
                                            "properties": {
                                                "deletedCount": {
                                                    "type": "number",
                                                    "format": "int64",
                                                    "example": 1
                                                },
                                                "deletedIdes": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "string"
                                                    }
                                                },
                                                "deletedType": {
                                                    "type": "string",
                                                    "enum": [
                                                        "product",
                                                        "category_thumb",
                                                        "category_banner",
                                                        "home_banner"
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        content: {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        content: {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/asset/upload": {
            "post": {
                tags: ["Asset"],
                "summary": "upload asset",
                "description": "upload asset server and store in database",
                "operationId": "uploadAsset",
                "requestBody": {
                    "description": "Only upload one item if multiple item provided the first one will get uploaded",
                    "content": {
                        "multipart/form-data": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    // only one of these is required
                                    "productImage": {
                                        "type": "array",
                                        "items": {
                                            "type": "string",
                                            "format": "binary"
                                        },
                                        "maxItems": 2,
                                    },
                                    "categoryImage": {
                                        "type": "array",
                                        "items": {
                                            "type": "string",
                                            "format": "binary"
                                        },
                                    },
                                    "categoryBanner": {
                                        "type": "array",
                                        "items": {
                                            "type": "string",
                                            "format": "binary"
                                        },
                                    },
                                    "homeBanner": {
                                        "type": "array",
                                        "items": {
                                            "type": "string",
                                            "format": "binary"
                                        },
                                    },
                                },

                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "successful operation",
                        content: {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/UploadedAsset"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        content: {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "message": {
                                            "type": "string",
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                    }
                }
            }
        }
    },

    schema: {
        "Asset": assetSchema,
        "UploadedAsset": {
            type: "object",
            properties: {
                message: {
                    type: "string",
                },
                data: {
                    type: "object",
                    properties: {
                        createdAsset: {
                            type: "array",
                            items: assetSchema
                        },
                        createdCount: {
                            type: "number",
                        }
                    }
                }
            }
        }
    }
}



