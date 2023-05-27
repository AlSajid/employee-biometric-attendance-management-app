import { connectDb } from "./db";
import Company from "./models/company";
import errorHandler from "./utilities/errorHandler";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":

            try {
                await connectDb();
                const result = await Company.findOne({})
                res.status(200).json(result)
                return;
            }
            catch (error) {
                res.status(500).json(errorHandler(error))
                return;
            }
        case "POST":

            const result = await Company.updateOne(
                {},
                { ...req.body },
                { upsert: true }
            );

            (result.acknowledged === true && (result.modifiedCount === 1 || result.upsertedCount === 1))
                ? res.status(200).json({ message: "success" })
                : res.status(500).json("error");
            break;
    }
}