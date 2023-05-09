import database from "./database"
import errorHandler from "./utilities/errorHandler";

export default async function handler(req, res) {
    try {

        const users = await database.collection("users").find().toArray()
        res.status(200).json(users)
        return;
    }
    catch (error) {
        res.status(500).json(errorHandler(error))
        return;
    }
}