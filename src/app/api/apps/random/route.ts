import { NextRequest, NextResponse } from "next/server";
import App from "../../_lib/models/apps";
import { RowDataPacket } from "mysql2";

export async function GET(req: NextRequest){

    const [result] = (await App.getLast()) as Array<RowDataPacket>
    return NextResponse.json(result)
}