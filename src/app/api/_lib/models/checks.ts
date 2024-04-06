import { RowDataPacket } from "mysql2";
import { db } from "../config/db";
import Endpoint from "./endpoint";

interface Check {
    id?: number,
    endpointId: number,
    status: number,
    code: number
}

class Check {
    constructor(endpointId: number, code: number) {
        this.endpointId = endpointId;
        this.code = code;
        this.status = (code === 200 || code === 300 ? 0 : 1)
    }

    async save() {
        let sql = `INSERT INTO checks (endpointId, status, code) VALUES (
            ${this.endpointId}, 
            ${this.status},
            ${this.code}
        );`

        return (db.execute(sql));
    }
    static getForEndpoint(id: number) {
        let sql = `SELECT * FROM checks WHERE endpointId = ${id} ORDER BY id DESC;`
        return db.execute(sql)
    }
}

export default Check; 