import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // Read the request body only once
        const dailyStatusData = await request.json();
        const { ownership, remark, idelqty, opqty, downqty, refnumber, categoryId } = dailyStatusData;

        // Use the destructured values directly in the Prisma create function
        const dailyStatus = await db.DailyStatus.create({
            data: {
                categoryId: categoryId,
                idelqty: idelqty,
                opqty: opqty,
                downqty: downqty,
                refnumber: refnumber,
                ownership: ownership,
                remark: remark,
            }
        });

        console.log(dailyStatus);
        return NextResponse.json(dailyStatus);

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                error,
                message: "Failed to create a DailyStatus",
            },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    try {
        const dailyStatus = await db.DailyStatus.findMany({
            orderBy: {
                createdAt: 'desc' //latest Warehouse
            },
            include: {
                category: true, //Returns all fields for all categories
            }
        });
        return NextResponse.json(dailyStatus);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Fetch the DailyStatus"
        }, { status: 500 })
    }
}
export async function DELETE(request) {
    //here we use NEXT URL to search params
    try {
        const id = request.nextUrl.searchParams.get("id")
        const deleteDailyStatus = await db.DailyStatus.delete({
            where: {
                id
            }
        })
        console.log(deleteDailyStatus)
        return NextResponse.json(deleteDailyStatus)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                error,
                message: "Failed to Delete DailyStatus",
            },
            {
                status: 500,
            }
        );
    }
}