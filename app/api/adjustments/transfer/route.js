import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { itemId, referenceNumber, transferStockQty, givingWarehouseId, receivingWarehouseId, notes } = await request.json();

        if (!itemId || !transferStockQty || !givingWarehouseId || !receivingWarehouseId) {
            return NextResponse.json({ message: "Invalid input" }, { status: 400 });
        }

        const itemData = await db.item.findUnique({ where: { id: itemId } });

        if (!itemData) {
            return NextResponse.json({ message: "Item not found" }, { status: 404 });
        }

        const givingWarehouse = await db.warehouse.findUnique({ where: { id: givingWarehouseId } });
        const receivingWarehouse = await db.warehouse.findUnique({ where: { id: receivingWarehouseId } });

        if (!givingWarehouse || !receivingWarehouse) {
            return NextResponse.json({ message: "Warehouse not found" }, { status: 404 });
        }

        const currentGivingWarehouseStock = givingWarehouse.stockQty;

        if (parseInt(currentGivingWarehouseStock) >= parseInt(transferStockQty)) {
            const newStockForGivingWarehouse = parseInt(currentGivingWarehouseStock) - parseInt(transferStockQty);

            await db.warehouse.update({
                where: { id: givingWarehouseId },
                data: { stockQty: newStockForGivingWarehouse },
            });

            const newStockForReceivingWarehouse = parseInt(receivingWarehouse.stockQty) + parseInt(transferStockQty);

            await db.warehouse.update({
                where: { id: receivingWarehouseId },
                data: { stockQty: newStockForReceivingWarehouse },
            });

            // Check if item exists in the receiving warehouse
            const existingItemInReceivingWarehouse = await db.item.findUnique({
                where: {
                    id: itemId,
                    warehouseId: receivingWarehouseId
                }
            });

            let updatedItemReceivingWarehouse;
            if (existingItemInReceivingWarehouse) {
                updatedItemReceivingWarehouse = await db.item.update({
                    where: {
                        id: itemId,
                    },
                    data: {
                        warehouseId: receivingWarehouseId,
                        quantity: newStockForReceivingWarehouse,
                    },
                });
            } else {
                updatedItemReceivingWarehouse = await db.item.create({
                    data: {
                        warehouseId: receivingWarehouseId,
                        quantity: newStockForReceivingWarehouse,
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

                        quantity: newStockForReceivingWarehouse,
                        imageUrl: itemData.imageUrl,
                        weight: parseFloat(itemData.weight),
                        dimensions: itemData.dimensions,
                        taxRate: parseFloat(itemData.taxRate),
                        description: itemData.description,
                        notes: itemData.notes
                        // Add other fields as necessary (e.g., title, description, etc.)
                    },
                });
            }

            const adjustment = await db.transferStockAdjustment.create({
                data: {
                    itemId,
                    referenceNumber,
                    transferStockQty: parseInt(transferStockQty),
                    givingWarehouseId,
                    receivingWarehouseId,
                    notes,
                },
            });

            return NextResponse.json(adjustment);
        } else {
            return NextResponse.json({ message: "Not enough stock in giving warehouse" }, { status: 409 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error, message: "Failed to create adjustment" }, { status: 500 });
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