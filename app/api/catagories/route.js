import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { title, description } = await request.json();

        // for prisma use
        const category = await db.category.create({
            data: {
                title: title,
                description: description
            }
        });
        /* for console log it 
        const category = { title, description };*/
        console.log(category)
        return NextResponse.json(category)


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create a category"
        }, { status: 500 })
    }
}