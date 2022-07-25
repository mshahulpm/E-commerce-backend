import { AssetType, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const assetCount = async (type: AssetType) => await prisma.asset.count({
    where: {
        type
    }
});
export const productCount = async () => await prisma.product.count();
export const categoryCount = async () => await prisma.category.count();
export const userCount = async () => await prisma.user.count();
export const orderCount = async () => await prisma.order.count();
export const orderItemCount = async () => await prisma.orderItem.count();