import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
    try {
        const dailyStatus = await db.DailyStatus.findUnique({
            where: {
                id
            },
            include: {
                category: true, //Returns all fields for all categories
                topdailyStatus: true,//Returns all fields for all TopdailyStatus
            }
        });
        console.log("where", dailyStatus)
        return NextResponse.json(dailyStatus);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to Fetch DailyStatus by this ${id}`
        }, { status: 500 })
    }
}
export async function PUT(request, { params: { id } }) {
    // here specify the columns you want to update
    try {
        const dailyStatusData = await request.json()
        const DailyStatus = await db.DailyStatus.update({
            where: {
                id //to updating DailyStatus data by id 
            },
            data: {
                title: dailyStatusData.title,
                categoryId: dailyStatusData.categoryId,
                topdailyStatusId: dailyStatusData.topdailyStatusId,
                idelqty: dailyStatusData.idelqty,
                opqty: dailyStatusData.opqty,
                downqty: dailyStatusData.downqty,
                refnumber: dailyStatusData.refnumber,
                ownership: dailyStatusData.ownership,
                remark: dailyStatusData.remark
            }
        });
        console.log(DailyStatus)
        return NextResponse.json(DailyStatus);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to update the DailyStatus by this ${id}`
        }, { status: 500 })

    }
}
export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const dailyStatus = await db.DailyStatus.delete({
            where: {
                id: id // Ensure the id is correctly used
            }
        });

        return NextResponse.json(dailyStatus);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                error,
                message: "Failed to delete DailyStatus",
            },
            {
                status: 500,
            }
        );
    }
}