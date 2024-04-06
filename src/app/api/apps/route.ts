import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import App from "../_lib/models/apps";
import { getUserFromToken } from "../_lib/token";
import { RowDataPacket } from "mysql2";



export async function GET(req: NextRequest) {

    const token = cookies().get("token")?.value

    if (token) {
        const user = getUserFromToken(token)
        if (user.id) {

            const [apps] = (await App.getForUserId(user.id)) as Array<RowDataPacket>

            return NextResponse.json(apps)

        } else {
            return new NextResponse("Auth Error", { status: 403 })
        }

    } else {
        return new NextResponse("UserNotLoggedIn", { status: 403 })
    }

    return new NextResponse("OK")
}