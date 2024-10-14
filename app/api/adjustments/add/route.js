import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { addStockQty,
            receivingWarehouseId,
            notes,
            referenceNumber,
            itemId
        } = await request.json();
        // //# While Adding a stock so 1st get the item 
        const ItemToUpdate = await db.item.findUnique({
            where: {
                id: itemId,
            },

        })
        // //# Get the Current Item Quantity
        const currentItemQty = ItemToUpdate.quantity
        const newQty = parseInt(currentItemQty) + parseInt(addStockQty)

        //# Modify the Item to the New Qty
        const updatedItem = await db.item.update({
            where: {
                id: itemId,
            },
            data: {
                quantity: newQty,
            },
        });

        console.log(updatedItem)
        // const adjustment = await db.addStockAdjustment.create({
        //     data: {
        //         itemId,
        //         referenceNumber,
        //         addStockQty: parseInt(addStockQty),
        //         receivingWarehouseId,
        //         notes,
        //     }
        // });
        // console.log(adjustment)



        //After adding it should affect the warehouse data too


        return NextResponse.json(adjustment)

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create adjustment"
        }, { status: 500 })
    }

}

export async function GET(request) {
    try {
        const adjustments = await db.addStockAdjustment.findMany({
            orderBy: {
                createdAt: 'desc' //latest add stock adjustments
            },
        });
        return NextResponse.json(adjustments);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Fetch the adjustments"
        }, { status: 500 })
    }
}
export async function DELETE(request) {
    //here we use NEXT URL to search params
    try {
        const id = request.nextUrl.searchParams.get("id")
        const deletedAdjustment = await db.addStockAdjustment.delete({
            where: {
                id
            }
        })
        console.log(deletedAdjustment)
        return NextResponse.json(deletedAdjustment)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                error,
                message: "Failed to delete Adjustment",
            },
            {
                status: 500,
            }
        );
    }
}