import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
    try {
        const item = await db.item.findUnique({
            where: {
                id //to fetch single item by id on latest version Find one is changed to FindUnique
            },  // findMAny(include or select or... have much options so go and check the prisma documentation 
            include: { //check a nested columns logic 
                category: true, //Returns single category by id which is related with item fields
                supplier: true,//it has to match with the schema you put on model item 
                unit: true,//Returns single unit by id which is related with item fields
                warehouse: true,////Returns single warehouse by id which is related with item fields
                brand: true,//Returns single brand by id which is related with item fields
            }
        });
        return NextResponse.json(item);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to Fetch item by this ${id}`
        }, { status: 500 })
    }
}
export async function PUT(request, { params: { id } }) {
    try {
        const itemData = await request.json()
        const item = await db.item.update({
            where: {
                id //to updating item data by id 
            },
            data: {
                title: itemData.title,
                categoryId: itemData.categoryId,
                sku: itemData.sku,
                barcode: itemData.barcode,
                quantity: parseInt(itemData.quantity),
                unitId: itemData.unitId,
                brandId: itemData.brandId,
                supplierId: itemData.supplierId,
                buyingPrice: parseFloat(itemData.buyingPrice),
                sellingPrice: parseFloat(itemData.sellingPrice),
                reOrderPoint: parseInt(itemData.reOrderPoint),
                warehouseId: itemData.warehouseId,
                imageUrl: itemData.imageUrl,
                weight: parseFloat(itemData.weight),
                dimensions: itemData.dimensions,
                taxRate: parseFloat(itemData.taxRate),
                description: itemData.description,
                notes: itemData.notes
            }
        })
        console.log(item)
        return NextResponse.json(item);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to update the item by this ${id}`
        }, { status: 500 })
    }
}