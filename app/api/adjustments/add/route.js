import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { addStockQty,
            receivingWarehouseId,
            notes,
            referenceNumber,
            itemId,
            supplierId,
        } = await request.json();
        // //# 1st get the item to fetch value of item quantity to add
        const ItemToUpdate = await db.item.findUnique({
            where: {
                id: itemId,
            },

        })
        // //# Get the Current Item Quantity value and add to the existing value
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
        //#since stock changed here 1st Get the warehouse(fetch)
        const warehouse = await db.warehouse.findUnique({
            where: {
                id: receivingWarehouseId
            }
        })
        //#2nd current Stock of the warehouse
        const currentWarehouseStock = warehouse.stockQty;
        const NewStockQty = parseInt(currentWarehouseStock) + parseInt(addStockQty)
        //#3rd Update the Stock in the warehouse
        const updatedWarehouse = await db.warehouse.update({
            where: {
                id: receivingWarehouseId,
            },
            data: {
                stockQty: NewStockQty
            }
        })

        //  console.log(updatedItem)
        const adjustment = await db.addStockAdjustment.create({
            data: {
                itemId,
                referenceNumber,
                addStockQty: parseInt(addStockQty),
                receivingWarehouseId,
                notes,
                supplierId,
            }
        });
        console.log(adjustment)

        {/* paused in 1:02:44 */ }

        //  After adding it should affect the warehouse data too


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
        //console.log(deletedAdjustment)
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