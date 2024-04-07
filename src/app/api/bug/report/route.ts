import { NextRequest, NextResponse } from "next/server";
import Bug from "../../_lib/models/bugs";
import { RowDataPacket } from "mysql2";
import App from "../../_lib/models/apps";
import User from "../../_lib/models/user";

export async function POST(req: NextRequest) {
    const { title, description, url, reportersEmail, appId } = await req.json()

    const [app] = (await User.getForApp(appId)) as Array<RowDataPacket>    

    const newBug = new Bug(title, description, url, reportersEmail, appId, app[0].ownerId)
    const [response] = (await newBug.save()) as Array<RowDataPacket>

    if (!response.waringStatus) {
        const [res] = await App.changeStatus(appId, 1)
        console.log(res);
        
        return new NextResponse("OK", { status: 200 })
    } else {
        return new NextResponse("Err", { status: 500 })
    }


}