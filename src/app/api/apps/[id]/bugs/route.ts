import Bug from "@/app/api/_lib/models/bugs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

    const [response] = (await Bug.getForApp(Number(params.id)))

    return NextResponse.json(response)
}