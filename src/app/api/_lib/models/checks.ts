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

    static getForEndpoint(id: number, faults?: boolean, date?: string) {
        let sql = `SELECT * FROM checks 
        WHERE endpointId = ${id} 
        ${(faults ? "AND status != 0" : "")} 
        ${(date ? `AND DATE(date) = '${date}' ` : "")} 
        ORDER BY id DESC
        ;`
        return db.execute(sql)
    }

    static getForIds(idStr: string, epnum: number) {
        let sql = `SELECT * FROM checks 
        WHERE endpointId IN (${idStr.slice(0, 3*epnum - 2)}) 
        ORDER BY id DESC
        LIMIT 0, ${epnum*20} 
        ;`
        return db.execute(sql)
    }

    static getForEndpt(id: number){
        let sql = `SELECT * FROM checks 
        WHERE endpointId = ${id} 
        ORDER BY id DESC
        LIMIT 0, 20 
        ;`
        return db.execute(sql)
    }

    static getNumInDay(id: number, date: string) {
        let sql = `SELECT COUNT (date) FROM checks WHERE endpointId = ${id} AND DATE(date) = '${date}';`
        return db.execute(sql);
    }
}

export default Check; 