import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
    try {
        const category = await db.Category.findUnique({
            where: {
                id //to fetch single category by id on latest version Find one is changed to FindUnique
            },
        });
        return NextResponse.json(category);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to Fetch category by this ${id}`
        }, { status: 500 })
    }
}
export async function PUT(request, { params: { id } }) {
    // here specify the columns you want to update
    const { title } = await request.json()
    try {
        const category = await db.Category.update({
            where: {
                id //to updating category data by id 
            },
            data: {
                title
            }
        });
        console.log(category)
        return NextResponse.json(category);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to update the category by this ${id}`
        }, { status: 500 })
    }
}