import { db } from "../config/db";

interface Endpoint {
    id?: number;
    appId: number;
    url: string;
    status: number;
}

class Endpoint {
    constructor(appId: number, url: string, status: number) {
        this.appId = appId;
        this.url = url;
        this.status = status;
    }

    async save() {
        let sql = `INSERT INTO endpoints (appId, url, status) 
        VALUES (
            ${this.appId},
            '${this.url}',
            ${this.status}
        )
        `
        return db.execute(sql);
    }

    static getForAppId(id: number) {
        let sql = `SELECT * FROM endpoints WHERE appId = ${id};`
        return db.execute(sql)
    }
    static delete(id: number) {
        let sql = `DELETE FROM endpoints WHERE id = ${id};`
        return db.execute(sql)
    }
}

export default Endpoint;