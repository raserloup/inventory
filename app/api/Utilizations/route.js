import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { title, idelqty, opqty, downqty } = await request.json();

        // for prisma use
        const Utilization = await db.Utilization.create({
            data: {
                title: title,
                idelqty: idelqty,
                opqty: opqty,
                downqty: downqty
            }
        });
        console.log(Utilization)
        return NextResponse.json(Utilization)


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create a Utilization"
        }, { status: 500 })
    }
}
export async function GET(request) {
    try {
        const Utilization = await db.Utilization.findMany({
            orderBy: {
                createdAt: 'desc' //latest Warehouse
            },
        });
        return NextResponse.json(Utilization);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Fetch the Utilization"
        }, { status: 500 })
    }
}
export async function DELETE(request) {
    //here we use NEXT URL to search params
    try {
        const id = request.nextUrl.searchParams.get("id")
        const deleteUtilization = await db.Utilization.delete({
            where: {
                id
            }
        })
        console.log(deleteUtilization)
        return NextResponse.json(deleteUtilization)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                error,
                message: "Failed to Delete Utilization",
            },
            {
                status: 500,
            }
        );
    }
}