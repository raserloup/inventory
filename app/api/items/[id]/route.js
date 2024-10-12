import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
    try {
        const item = await db.item.findUnique({
            where: {
                id //to fetch single item by id on latest version Find one is changed to FindUnique
            },
        });
        return NextResponse.json(item);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to Fetch item by this ${id}`
        }, { status: 500 })
    }
}
export async function PUT(request, { params: { id } }) {
    const { title } = await request.json()
    try {
        const item = await db.item.update({
            where: {
                id //to updating item data by id 
            },
            data: {
                title
            }
        });
        console.log(item)
        return NextResponse.json(item);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to update the item by this ${id}`
        }, { status: 500 })
    }
}