import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
    try {
        const dailyStatus = await db.DailyStatus.findUnique({
            where: {
                id //to fetch single DailyStatus by id on latest version Find one is changed to FindUnique
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
            message: `Failed to Fetch DailyStatus by this ${id}`
        }, { status: 500 })
    }
}
export async function PUT(request, { params: { id } }) {
    // here specify the columns you want to update
    const { title, idelqty,
        opqty,
        downqty,
        refnumber, categoryId: categoryId, ownership, remark } = await request.json()
    try {
        const DailyStatus = await db.DailyStatus.update({
            where: {
                id //to updating DailyStatus data by id 
            },
            data: {
                title,
                categoryId: categoryId,
                idelqty,
                opqty,
                downqty,
                refnumber, ownership, remark,
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
