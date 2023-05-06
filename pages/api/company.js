import database from "./database";
import errorHandler from "./utilities/errorHandler";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":

            try {
                const company = await database.collection("company").findOne()
                res.status(200).json(company)
                return;
            }
            catch (error) {
                res.status(500).json(errorHandler(error))
                return;
            }
    }
}