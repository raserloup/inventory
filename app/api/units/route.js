import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { title, abbreviation } = await request.json();
        // for prisma use
        const unit = await db.unit.create({
            data: {
                title: title,
                abbreviation: abbreviation
            }
        });

        console.log(unit)
        return NextResponse.json(unit)

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create a unit"
        }, { status: 500 })
    }
}