import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
    try {
        const Utilization = await db.Utilization.findUnique({
            where: {
                id //to fetch single Utilization by id on latest version Find one is changed to FindUnique
            },
        });
        return NextResponse.json(Utilization);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to Fetch Utilization by this ${id}`
        }, { status: 500 })
    }
}
export async function PUT(request, { params: { id } }) {
    // here specify the columns you want to update
    const { title, idelqty,
        opqty,
        downqty,
        refnumber, platenumber } = await request.json()
    try {
        const Utilization = await db.Utilization.update({
            where: {
                id //to updating Utilization data by id 
            },
            data: {
                title,
                platenumber,
                idelqty,
                opqty,
                downqty,
                refnumber
            }
        });
        console.log(Utilization)
        return NextResponse.json(Utilization);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to update the Utilization by this ${id}`
        }, { status: 500 })
    }
}
// export async function DELETE(request) {
//     //here we use NEXT URL to search params
//     try {
//         const id = request.nextUrl.searchParams.get("id")
//         const Utilization = await db.Utilization.delete({
//             where: {
//                 id
//             }
//         })
//         //console.log(Utilization)
//         return NextResponse.json(Utilization)
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json(
//             {
//                 error,
//                 message: "Failed to delete Utilization",
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
        const Utilization = await db.Utilization.delete({
            where: {
                id: id // Ensure the id is correctly used
            }
        });

        return NextResponse.json(Utilization);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                error,
                message: "Failed to delete Utilization",
            },
            {
                status: 500,
            }
        );
    }
}
