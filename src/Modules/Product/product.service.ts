import { PrismaClient, Product } from "@prisma/client";



export class ProductService {

    prisma = new PrismaClient()
    PRODUCT = this.prisma.product

    async getAll() {
        try {
            return this.PRODUCT.findMany()
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async getOne(productId: string) {
        try {
            return this.PRODUCT.findUnique({
                where: {
                    productId
                },
            })
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async getOneBySlug(slug: string) {
        try {
            return this.PRODUCT.findUnique({
                where: {
                    slug
                },
            })
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async create(data: Product) {
        try {
            return this.PRODUCT.create({
                // @ts-ignore
                data
            })
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async edit(productId: string, data: Omit<Product, "productId" | "createdAt" | "updatedAt">) {
        try {
            return this.PRODUCT.update({
                // @ts-ignore
                data,
                where: {
                    productId
                }
            })
        } catch (error) {
            return Promise.reject(error)
        }
    }



}