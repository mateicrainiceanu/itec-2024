import { NextRequest, NextResponse } from "next/server";
import App from "../../_lib/models/apps";
import { RowDataPacket } from "mysql2";
import Endpoint from "../../_lib/models/endpoint";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params

    const [response] = (await App.getForAppId(Number(id))) as Array<RowDataPacket>

    const res = response[0];

    const [endpoints] = (await Endpoint.getForAppId(res.id)) as Array<RowDataPacket>

    return NextResponse.json({...res, endpoints: endpoints})
}