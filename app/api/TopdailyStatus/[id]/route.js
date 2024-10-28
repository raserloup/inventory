import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
    try {
        const dailyStatustop = await db.TopdailyStatus.findUnique({
            where: {
                id //to fetch single DailyStatus by id on latest version Find one is changed to FindUnique
            },
            include: {

                warehouse: true,
                dailyStatus: true,
            }
        });
        return NextResponse.json(dailyStatustop);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to Fetch DailyStatustop by this ${id}`
        }, { status: 500 })
    }
}
export async function PUT(request, { params: { id } }) {
    const dailyStatustopData = await request.json();
    //# 1st Get the warehouse(fetch)
    const warehouse = await db.warehouse.findUnique({
        where: {
            id: dailyStatustopData.warehouseId,
        }
    })


    try {
        const DailyStatustop = await db.TopdailyStatus.update({
            where: {
                id //to updating DailyStatus data by id 
            },
            data: {

                warehouseId: DailyStatustop.warehouseId,
                date: DailyStatustop.date,
                dailystatusId: DailyStatustop.dailystatusId,
                refnumber: DailyStatustop.refnumber,
            }
        });
        console.log(DailyStatustop)
        return NextResponse.json(DailyStatustop);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to update the DailyStatustop by this ${id}`
        }, { status: 500 })
    }
}
// export async function DELETE(request) {
//     //here we use NEXT URL to search params
//     try {
//         const id = request.nextUrl.searchParams.get("id")
//         const DailyStatus = await db.DailyStatus.delete({
//             where: {
//                 id
//             }
//         })
//         //console.log(DailyStatus)
//         return NextResponse.json(DailyStatus)
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json(
//             {
//                 error,
//                 message: "Failed to delete DailyStatus",
//             },
//             {
//                 status: 500,
//             }
//         );
//     }
// }
export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const dailyStatustop = await db.TopdailyStatus.delete({
            where: {
                id: id // Ensure the id is correctly used
            }
        });

        return NextResponse.json(dailyStatustop);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                error,
                message: "Failed to delete DailyStatustop",
            },
            {
                status: 500,
            }
        );
    }
}
