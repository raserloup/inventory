import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { title } = await request.json();
        // for prisma use
        const brand = await db.brand.create({
            data: {
                title: title,
            }
        });

        console.log(brand)
        return NextResponse.json(brand)


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create a brand"
        }, { status: 500 })
    }
}
export async function GET(request) {
    try {
        const brands = await db.brand.findMany({
            orderBy: {
                createdAt: 'desc' //to fetch latest brands
            },
        });
        return NextResponse.json(brands);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Fetch the brands"
        }, { status: 500 })
    }
}