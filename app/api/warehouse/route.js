import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        /* const  { type, title, categoryId,
             sku, barcode, quantity, unitId, brandId,
             supplierId, buyingPrice, sellingPrice,
             reOrderPoint, warehouseId, imageUrl,
             weight, dimensions, taxRate,
             description, notes } = await request.json();*/

        // for prisma use
        const { title, location, type, description } = await request.json();
        const warehouse = await db.warehouse.create({
            data: {
                title: title,
                location: location,
                warehouseType: type,
                description: description,
            }
        });
        //const item = { title, description, location, type, };
        console.log(warehouse)
        return NextResponse.json(warehouse)

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create an Item"
        }, { status: 500 })
    }
}