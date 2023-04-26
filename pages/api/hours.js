import database from "./database";
import errorHandler from "./utilities/errorHandler";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            const result = await database.collection("hours").updateOne(
                {},
                { $set: { ...req.body, updated: new Date() } },
            );

            if (result.acknowledged === true) {
                res.status(200).json("success");
                return
            }

            res.status(500).json("failed");
            break;

        case "GET":
            try {
                const data = await database.collection("hours").findOne()
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json(errorHandler(error))
            }
            break;
    }
}