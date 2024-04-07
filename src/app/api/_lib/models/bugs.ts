import { db } from "../config/db"

interface Bug {
    id?: number,
    title: string,
    status: number,
    description: string,
    url: string,
    reportersEmail: string,
    appId: number,
    userId: number
}

class Bug {
    constructor(title: string,
        description: string,
        url: string,
        reportersEmail: string,
        appId: number, userId: number) {
        this.title = title
        this.status = 0
        this.description = description
        this.url = url
        this.reportersEmail = reportersEmail
        this.appId = appId
        this.userId = userId
    }

    async save() {
        let sql = `INSERT INTO bugs (title, appId, status, description, url, reportersEmail, userId) VALUES (
            '${this.title}',
            ${this.appId},
            ${this.status},
            '${this.description}',
            '${this.url}',
            '${this.reportersEmail}',
            '${this.userId}'
        );`

        return db.execute(sql)
    }

    static getForOwner(id: number) {
        let sql = `SELECT * FROM bugs WHERE userId = ${id} AND status=0;`;
        return db.execute(sql)
    }
}

export default Bug