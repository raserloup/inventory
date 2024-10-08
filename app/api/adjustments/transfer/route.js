import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { transferStockQty, givingWarehouseId,
            receivingWarehouseID,
            notes
        } = await request.json();
        const adjustment = {
            transferStockQty, givingWarehouseId,
            receivingWarehouseID,
            notes
        };
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