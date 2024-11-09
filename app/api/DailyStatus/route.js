import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const dailyStatusData = await request.json();

        // Fetch the TopDailyStatus and Category records
        const topDailyStatus = await db.TopdailyStatus.findUnique({
            where: { id: dailyStatusData.topdailyStatusId },
        });
        const categoryId = await db.Category.findUnique({
            where: { id: dailyStatusData.categoryId },
        });

        // Validate Category and TopDailyStatus
        if (!categoryId) {
            throw new Error("Invalid Category ID.");
        }
        if (!topDailyStatus) {
            throw new Error("Invalid TopDailyStatus ID.");
        }

        // Create DailyStatus with nested creation for DailyStatusInline
        const dailyStatus = await db.DailyStatus.create({
            data: {
                categoryId: dailyStatusData.categoryId,
                topdailyStatusId: dailyStatusData.topdailyStatusId,
                idelqty: dailyStatusData.idelqty,
                opqty: dailyStatusData.opqty,
                downqty: dailyStatusData.downqty,
                refnumber: dailyStatusData.refnumber,
                ownership: dailyStatusData.ownership,
                remark: dailyStatusData.remark,
                // DailyStatusInline: {  // Add nested creation for DailyStatusInline
                //     create: {
                //         topdailyStatusId: dailyStatusData.topdailyStatusId,
                //         // any additional fields for DailyStatusInline
                //     },
                // },
            },
        });

        console.log(dailyStatus);
        return NextResponse.json(dailyStatus, { status: 201 });
    } catch (error) {
        console.error('Error creating DailyStatus:', error.message);
        return NextResponse.json(
            {
                error: error.message,
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
                createdAt: 'asc' //latest dailyStatus
            },
            include: {
                category: true,
                topdailyStatus: true, /* include only necessary fields */
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