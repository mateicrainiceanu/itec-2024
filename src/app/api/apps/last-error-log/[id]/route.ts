import { NextRequest, NextResponse } from "next/server";
import Check from "@/app/api/_lib/models/checks";
import { RowDataPacket } from "mysql2";
import Endpoint from "../../../_lib/models/endpoint";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params

    const [endpoints] = (await Endpoint.getForAppId(Number(id))) as Array<RowDataPacket>

    var idx = 0;

    // endpoints.map(async (endpoint: Endpoint) => {
    //     const [checks] = (await Check.getForEndpoint(Number(endpoint.id))) as Array<RowDataPacket>

    //     checks.map((check: Check, i) => {
    //         // console.log(check.status + " " + i + " " + endpoint.id);

    //         console.log(check.status != (checks[i + 1] as Check).status);

    //         if (check.status != (checks[i + 1] as Check).status) {
    //             "here"
    //             idx = i
    //             return
    //         }
    //         if (idx) {
    //             return
    //         }
    //     })
    // })

    return NextResponse.json({ endpoints: endpoints, idx: idx })
}