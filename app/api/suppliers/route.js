import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {

        const { title, phone, email, address, contactPerson, supplierCode, taxID, paymentTerms, notes } = await request.json();
        const supplier = await db.supplier.create({
            data: {
                title, phone, email, address, contactPerson, supplierCode, taxID, paymentTerms, notes
            }
        });
        console.log(supplier)
        return NextResponse.json(supplier)

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to create an supplier"
        }, { status: 500 })
    }
}
export async function GET(request) {
    try {
        const suppliers = await db.supplier.findMany({
            orderBy: {
                createdAt: 'desc' //latest supplier
            },
        });
        return NextResponse.json(suppliers);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: "Failed to Fetch the suppliers"
        }, { status: 500 })
    }
}
export async function DELETE(request) {
    //here we use NEXT URL to search params
    try {
        const id = request.nextUrl.searchParams.get("id")
        const deletedSupplier = await db.supplier.delete({
            where: {
                id
            }
        })
        console.log(deletedSupplier)
        return NextResponse.json(deletedSupplier)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                error,
                message: "Failed to delete Supplier",
            },
            {
                status: 500,
            }
        );
    }
}