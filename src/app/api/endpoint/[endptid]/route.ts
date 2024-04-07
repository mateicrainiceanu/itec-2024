import { NextRequest, NextResponse } from "next/server";
import Check from "../../_lib/models/checks";
import { RowDataPacket } from "mysql2";

export async function POST(req: NextRequest, { params }: { params: { endptid: string } }) {

    const { faults, date } = await req.json()
    const [response] = (await Check.getForEndpoint(Number(params.endptid), faults, date)) as Array<RowDataPacket>
    const [res] = (await Check.getNumInDay(Number(params.endptid), date)) as Array<RowDataPacket>
    const t = res[0]
    return NextResponse.json({ queryresult: response, count: t["COUNT (date)"] });
}