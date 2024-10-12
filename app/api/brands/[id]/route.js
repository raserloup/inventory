import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
    try {
        const brand = await db.brand.findUnique({
            where: {
                id //to fetch single brand by id on latest version Find one is changed to FindUnique
            },
        });
        return NextResponse.json(brand);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to Fetch brand by this ${id}`
        }, { status: 500 })
    }
}
export async function PUT(request, { params: { id } }) {
    const { title } = await request.json()
    try {
        const brand = await db.brand.update({
            where: {
                id //to updating brand data by id 
            },
            data: {
                title
            }
        });
        console.log(brand)
        return NextResponse.json(brand);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to update the brand by this ${id}`
        }, { status: 500 })
    }
}