import { NextRequest, NextResponse } from "next/server";
import Bug from "../../_lib/models/bugs";
import { RowDataPacket } from "mysql2";

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
    const [bugData] = (await Bug.getForId(params.id)) as Array<RowDataPacket>
    return NextResponse.json(bugData[0])
}

export async function DELETE(req: NextRequest, { params }: { params: { id: number } }){

    const [response] = await Bug.del(params.id)
    return NextResponse.json(response)
}