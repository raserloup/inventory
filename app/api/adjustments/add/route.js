import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { addStockQty, receivingWarehouseId,
            notes, referenceNumber, itemId
        } = await request.json();
        const adjustment =
            await db.addStockAdjustment.create({
                data: {
                    itemId,
                    referenceNumber,
                    addStockQty: parseInt(addStockQty),
                    receivingWarehouseId,
                    notes,
                }
            });
        console.log(adjustment)
        return NextResponse.json(adjustment)

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create adjustment"
        }, { status: 500 })
    }

}