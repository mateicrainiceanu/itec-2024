import { NextRequest, NextResponse } from "next/server";
import Check from "../../../_lib/models/checks";
import { RowDataPacket } from "mysql2";
import Endpoint from "@/app/api/_lib/models/endpoint";

export async function DELETE(req: NextRequest, { params }: { params: { endptid: string } }) {

    const [response] = (await Endpoint.delete(Number(params.endptid))) as Array<RowDataPacket>

    return NextResponse.json(response);
}