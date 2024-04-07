import { NextRequest, NextResponse } from "next/server";
import Endpoint from "../../../_lib/models/endpoint";
import { RowDataPacket } from "mysql2";
import Check from "../../../_lib/models/checks";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params

    const [result] = (await Check.getForEndpoint(Number(id)))as Array<RowDataPacket>
    

    return NextResponse.json(result)
}