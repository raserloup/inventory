import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { itemId, referenceNumber,
            transferStockQty,
            givingWarehouseId,
            receivingWarehouseId, notes,
        } = await request.json();
        //# Part 1: --------to Deducted from the Stockqty from giving warehouse
        //# Get the giving warehouse
        const GivingWarehouse = await db.warehouse.findUnique({
            where: {
                id: givingWarehouseId
            }
        })
        //# Get the currentStock
        const currentGivingWarehouseStock = GivingWarehouse.stockQty;
        //# Needs to check transfer Stock qty< current StockQty
        if (parseInt(currentGivingWarehouseStock) > parseInt
            (transferStockQty)) {
            const newStockForGivingWarehouse = parseInt(currentGivingWarehouseStock) -
                parseInt(transferStockQty)
            //#UPdate Stock
            const updateGivingWarehouse = await db.warehouse.update({
                where: {
                    id: givingWarehouseId
                },
                data: {
                    stockQty: newStockForGivingWarehouse
                }
            })
            //#Add the Stockqty to the receiving warehouse
            //#Get the receiving warehouse
            const receivingWarehouse = await db.warehouse.findUnique({
                where: {
                    id: receivingWarehouseId
                }
            })
            //#Get the currentStock
            const currentReceivingWarehouseStock = receivingWarehouse.stockQty;
            const newStockForReceivingWarehouse = parseInt(currentReceivingWarehouseStock) + parseInt(transferStockQty)
            //#UPdate Stock
            const updateReceivingWarehouse = await db.warehouse.update({
                where: {
                    id: receivingWarehouseId
                },
                data: {
                    stockQty: newStockForReceivingWarehouse
                }
            })

            const adjustment =
                await db.transferStockAdjustment.create({
                    data: {
                        itemId, referenceNumber,
                        transferStockQty: parseInt(transferStockQty),
                        givingWarehouseId,
                        receivingWarehouseId,
                        notes,
                    }
                });
            console.log(adjustment)
            return NextResponse.json(adjustment)
            // End of Part 1
        } else {
            return NextResponse.json(
                {
                    //# Part 2: -- StockQty is not enough to make the transfer
                    data: null,
                    message: "Giving warehouse has no enough stock"
                },
                { status: 409 }
            );
        }
        // End of Part 2
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
        const adjustments = await db.transferStockAdjustment.findMany({
            orderBy: {
                createdAt: 'desc' //latest transfer stock
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
        const deletedAdjustment = await db.transferStockAdjustment.delete({
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