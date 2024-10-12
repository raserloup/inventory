import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
    try {
        const warehouse = await db.Warehouse.findUnique({
            where: {
                id //to fetch single warehouse by id on latest version Find one is changed to FindUnique
            },
        });
        return NextResponse.json(warehouse);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to Fetch warehouse by this ${id}`
        }, { status: 500 })
    }
}
export async function PUT(request, { params: { id } }) {
    // here specify the columns you want to update
    const { title, location, description, type } = await request.json()
    try {
        const warehouse = await db.Warehouse.update({
            where: {
                id //to updating warehouse data by id 
            },
            //provide the data's you want to update
            data: {
                title, location, description, warehouseType: type,
            }
        });
        console.log(warehouse)
        return NextResponse.json(warehouse);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to update the warehouse by this ${id}`
        }, { status: 500 })
    }
} 