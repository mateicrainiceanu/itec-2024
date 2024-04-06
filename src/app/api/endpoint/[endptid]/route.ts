import { NextRequest, NextResponse } from "next/server";
import Check from "../../_lib/models/checks";
import { RowDataPacket } from "mysql2";

export async function GET(req: NextRequest, { params }: { params: { endptid: string } }) {
    const [response] = (await Check.getForEndpoint(Number(params.endptid))) as Array<RowDataPacket>
    return NextResponse.json(response);
}