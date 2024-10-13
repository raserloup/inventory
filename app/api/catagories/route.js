import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { title, description } = await request.json();

        // for prisma use
        const category = await db.Category.create({
            data: {
                title: title,
                description: description
            }
        });
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
export async function GET(request) {
    try {
        const category = await db.Category.findMany({
            orderBy: {
                createdAt: 'desc' //latest Warehouse
            },
        });
        return NextResponse.json(category);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Fetch the category"
        }, { status: 500 })
    }
}
export async function DELETE(request) {
    //here we use NEXT URL to search params
    try {
        const id = request.nextUrl.searchParams.get("id")
        const deleteCategory = await db.Category.delete({
            where: {
                id
            }
        })
        console.log(deleteCategory)
        return NextResponse.json(deleteCategory)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                error,
                message: "Failed to Delete category",
            },
            {
                status: 500,
            }
        );
    }
}