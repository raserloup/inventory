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
        downqty, } = await request.json()
    try {
        const Utilization = await db.Utilization.update({
            where: {
                id //to updating Utilization data by id 
            },
            data: {
                title,
                idelqty,
                opqty,
                downqty,
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