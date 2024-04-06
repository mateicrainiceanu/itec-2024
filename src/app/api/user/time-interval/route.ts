import { NextRequest, NextResponse } from "next/server";
import User from "../../_lib/models/user";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";
import { cookies } from "next/headers"
import { getUserFromToken } from "../../_lib/token";

export async function POST(req: NextRequest) {
    const { timeint } = await req.json()

    const token = cookies().get("token")?.value

    if (token) {
        const user = getUserFromToken(token)
        if (user.id) {
            let [resp] = (await User.update(user.id, "timeInterval", timeint*1000)) as Array<RowDataPacket>;
            return NextResponse.json({ status: resp.warinigStatus });
        } else {
            return new NextResponse("UserNotLoggedIn", { status: 403 })
        }

    } else {
        return new NextResponse("UserNotLoggedIn", { status: 403 })
    }
}