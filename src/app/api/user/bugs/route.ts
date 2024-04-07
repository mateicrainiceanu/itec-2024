import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"
import { getUserFromToken } from "../../_lib/token";
import { RowDataPacket } from "mysql2";
import App from "../../_lib/models/apps";
import Bug from "../../_lib/models/bugs";

export async function GET(req: NextRequest) {    

    const token = cookies().get("token")?.value

    if (token) {
        const user = getUserFromToken(token)
        if (user.id) {
            const [bugs] = await Bug.getForOwner(user.id) as Array<RowDataPacket>
            
            return NextResponse.json(bugs)


        } else {
            return new NextResponse("UserNotLoggedIn", { status: 403 })
        }

    } else {
        return new NextResponse("UserNotLoggedIn", { status: 403 })
    }
}