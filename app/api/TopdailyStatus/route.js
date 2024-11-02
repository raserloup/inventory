import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {


        const dailyStatusTopData = await request.json();

        const warehouse = await db.warehouse.findUnique({
            where: {
                id: dailyStatusTopData.warehouseId,
            }
        })


        const dailyStatusTop = await db.TopdailyStatus.create({
            data: {

                warehouseId: dailyStatusTopData.warehouseId,
                date: dailyStatusTopData.date,
                refnumber: dailyStatusTopData.refnumber,

            }
        });

        console.log(dailyStatusTop);
        return NextResponse.json(dailyStatusTop);

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                error,
                message: "Failed to create a DailyStatusTop",
            },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    try {
        const dailyStatusTop = await db.TopdailyStatus.findMany({
            orderBy: {
                createdAt: 'desc' //latest Warehouse
            },
            include: {

                warehouse: true,////Returns single warehouse by id which is related


            }
        });
        return NextResponse.json(dailyStatusTop);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Fetch the DailyStatusTop"
        }, { status: 500 })
    }
}
export async function DELETE(request) {
    //here we use NEXT URL to search params
    try {
        const id = request.nextUrl.searchParams.get("id")
        const deleteDailyStatusTop = await db.TopdailyStatus.delete({
            where: {
                id
            }
        })
        console.log(deleteDailyStatusTop)
        return NextResponse.json(deleteDailyStatusTop)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                error,
                message: "Failed to Delete DailyStatusTop",
            },
            {
                status: 500,
            }
        );
    }
}