import mysql from "mysql2/promise";
import city from  "../models/city.mjs";

export default class DatabaseService{
    conn;

    constructor(conn){
        this.conn = conn;
    }

    static async connect(){
        const conn = await mysql.createConnection({
            host: process.env.DATABASE_HOST || "localhost",
            user: "user",
            password: "password",
            database: "world",
        });

        return new DatabaseService(conn);
    }
}