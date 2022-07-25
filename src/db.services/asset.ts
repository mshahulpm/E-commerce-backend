import { PrismaClient, Prisma, AssetType } from "@prisma/client";
const { asset } = new PrismaClient();

export type GET_ALL_ASSET = {
    orderBy?: 'asc' | 'desc';
    limit?: number;
    page?: number;
    type?: AssetType;
}

export async function getAllAsset(args?: GET_ALL_ASSET) {

    const { orderBy = 'desc', limit = 10, page = 0, type } = args || {};

    return await asset.findMany({
        where: {
            type,
        },
        orderBy: {
            createdAt: orderBy
        },
        skip: +page * +limit,
        take: +limit,

    })
}


export async function createManyAsset(assets: Prisma.AssetCreateInput[]) {
    return await asset.createMany({
        data: assets
    });
}


export async function deleteManyAsset(assetIdes: string[]) {
    return await asset.deleteMany({
        where: {
            assetId: {
                in: assetIdes
            }
        }
    });
}