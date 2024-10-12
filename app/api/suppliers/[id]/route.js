import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
    try {
        const supplier = await db.Supplier.findUnique({ //Here db.Supplier has to match exactly the table Name
            where: {
                id //to fetch single Suppliers by id on latest version Find one is changed to FindUnique
            },
        });
        return NextResponse.json(supplier);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to Fetch Suppliers by this ${id}`
        }, { status: 500 })
    }
}

export async function PUT(request, { params: { id } }) {
    // here specify the columns you want to update
    const { title, phone, email, address, contactPerson, supplierCode, paymentTerms, taxID,
        notes, } = await request.json()
    try {
        const supplier = await db.Supplier.update

            ({//Here db.Supplier has to match exactly the table Name
                where: {
                    id //to updating Suppliers data by id 
                },
                data: {
                    //provide the data's you want to update
                    title, phone, email, address, contactPerson, supplierCode, paymentTerms, taxID,
                    notes
                }
            });
        console.log(supplier)
        return NextResponse.json(supplier);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error,
            message: `Failed to update the Supplier by this ${id}`
        }, { status: 500 })
    }
}