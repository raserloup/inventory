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
            include: { //check a nested columns logic 
                category: true, //Returns all fields for all categories
                supplier: true,//it has to match with the schema you put on model item 
                unit: true,//Returns all unit fields
                warehouse: true,//Returns all suppliers fields
                brand: true,//Returns all unit fields
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
export async function DELETE(request) {
    //here we use NEXT URL to search params
    try {
        const id = request.nextUrl.searchParams.get("id")
        const deletedItem = await db.item.delete({
            where: {
                id
            }
        })
        console.log(deletedItem)
        return NextResponse.json(deletedItem)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                error,
                message: "Failed to delete Item",
            },
            {
                status: 500,
            }
        );
    }
}