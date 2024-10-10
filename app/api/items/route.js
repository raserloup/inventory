import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const itemData = await request.json();
        console.log(itemData);
        const item = await db.item.create({
            data: {
                title: itemData.title,
                categoryId: itemData.categoryId,
                sku: itemData.sku,
                barcode: itemData.barcode,
                quantity: parseInt(itemData.qty),
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
        return NextResponse.json(item)

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create a Item"
        }, { status: 500 })
    }
}
export async function GET(request) {
    try {
        const items = await db.item.findMany({
            orderBy: {
                createdAt: 'desc' //latest items
            },
            // findMAny(include or select or... have much options so go and check the prisma documentation 
            include: {
                category: true, //Returns all fields for all categories
                // suppliers: true//Returns all suppliers fields
            }
        });
        return NextResponse.json(items);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Fetch the items"
        }, { status: 500 })
    }
}