import { NextRequest, NextResponse } from "next/server";
import Endpoint from "../../_lib/models/endpoint";

export async function POST(req: NextRequest){
    const {appId, url} = await req.json()

    const newEp = new Endpoint(appId, url, 0);
    const [resp] = await newEp.save()

    return NextResponse.json(resp)
}