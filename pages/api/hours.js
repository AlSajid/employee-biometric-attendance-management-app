import database from "./database";
import errorHandler from "./utilities/errorHandler";

export default async function handler(req, res) {

    try {
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
                break;

            case "GET":
                const data = await database.collection("hours").findOne()
                res.status(200).json(data);
                break;
        }
    }
    catch (error) {
        console.log("error");
        res.status(500).json(errorHandler(error));
    }
}