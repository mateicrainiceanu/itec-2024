import { NextRequest, NextResponse } from "next/server";
import Check from "../../_lib/models/checks";
import { RowDataPacket } from "mysql2";

export async function POST(req: NextRequest, { params }: { params: { endptid: string } }) {

    const {faults, date} = await req.json()
    const [response] = (await Check.getForEndpoint(Number(params.endptid), faults, date)) as Array<RowDataPacket>


    return NextResponse.json(response);
}