import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import App from "../../_lib/models/apps";
import { getUserFromToken } from "../../_lib/token";
import { RowDataPacket } from "mysql2";
import Endpoint from "../../_lib/models/endpoint";



export async function POST(req: NextRequest) {

    const { name, description, homepage, endpoint, status } = await req.json()

    const token = cookies().get("token")?.value

    if (token) {
        const user = getUserFromToken(token)
        if (user.id) {

            const newApp = new App(user.id, name, description, homepage, status)

            const [result] = (await newApp.save()) as Array<RowDataPacket>            

            if (result.insertId) {
                
                const newEndpoint = new Endpoint(result.insertId, endpoint, status)
                newEndpoint.save()

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

    return new NextResponse("OK")
}