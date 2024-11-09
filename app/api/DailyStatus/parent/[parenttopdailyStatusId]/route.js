import db from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
    const { parenttopdailyStatusId } = params;
    if (!parenttopdailyStatusId) {
        return NextResponse.json({ error: "topdailyStatusId is required" }, { status: 400 });
    }

    try {
        const dailyStatuses = await db.dailyStatus.findMany({
            where: { topdailyStatusId: parenttopdailyStatusId },
            include: { category: true, topdailyStatus: true },
            // Remove or modify orderBy based on schema
        });
        return NextResponse.json(dailyStatuses);
    } catch (error) {
        console.error("Error fetching DailyStatus by topdailyStatusId:", error);
        return NextResponse.json({
            error: error.message,
            message: `Failed to fetch DailyStatus by topdailyStatusId ${topdailyStatusId}`,
        }, { status: 500 });
    }
}
