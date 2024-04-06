import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import User from "../../_lib/models/user";
import { getUserFromToken } from "../../_lib/token";
import { RowDataPacket } from "mysql2";

export async function GET(req: NextRequest) {

    const token = cookies().get("token")?.value

    if (token) {
        const user = getUserFromToken(token)
        if (user.id) {

            const [result] = (await User.update(user.id, "role", 1)) as Array<RowDataPacket>

            if (!result.warningStatus) {
                return new NextResponse("OK");
            } else {
                return new NextResponse("Error", { status: 500 })
            }
        } else {
            return new NextResponse("Auth Error", { status: 403 })
        }

    } else {
        return new NextResponse("UserNotLoggedIn", { status: 403 })
    }
}