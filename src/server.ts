import express from "express";
import userRoutes from './routes/user';
import db from "../db/config";

class Server {

    private app: express.Application;
    private port: string;
    private paths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database is connected');
        } catch (error: any) {
            throw new Error (error);
        }
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`The server is running on port`);
        })
    }

    routes() {
        this.app.use(this.paths.users, userRoutes);
    }

    middlewares() {
        this.app.use(express.json());
    }
}

export default Server;