import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {

        const { title, location, type, description } = await request.json();
        const warehouse = await db.warehouse.create({
            data: {
                title: title,
                location: location,
                warehouseType: type,
                description: description,
            }
        });
        console.log(warehouse)
        return NextResponse.json(warehouse)

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create an Warehouse"
        }, { status: 500 })
    }
}
export async function GET(request) {
    try {
        const warehouse = await db.warehouse.findMany({
            orderBy: {
                createdAt: 'desc' //latest Warehouse
            },
        });
        return NextResponse.json(warehouse);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Fetch the Warehouse"
        }, { status: 500 })
    }
}