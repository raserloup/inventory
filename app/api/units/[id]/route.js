import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
    try {
        const unit = await db.unit.findUnique({
            where: {
                id //to fetch single unit by id on latest version Find one is changed to FindUnique
            },
        });
        return NextResponse.json(unit);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to Fetch unit by this ${id}`
        }, { status: 500 })
    }
}
export async function PUT(request, { params: { id } }) {
    const { title, abbreviation } = await request.json()
    try {
        const unit = await db.unit.update({
            where: {
                id //to updating unit data by id 
            },
            data: {
                title, abbreviation
            }
        });
        console.log(unit)
        return NextResponse.json(unit);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to update the unit by this ${id}`
        }, { status: 500 })
    }
}