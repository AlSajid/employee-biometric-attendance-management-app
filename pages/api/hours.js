import { connectDb } from "./db";
import Hours from "./models/hours";
import errorHandler from "./utilities/errorHandler";

export default async function handler(req, res) {
    console.log(req.body)
    try {
        await connectDb();

        switch (req.method) {
            case "POST":
                const result = await Hours.updateOne({}, { ...req.body });

                (result.acknowledged === true && result.modifiedCount === 1)
                    ? res.status(200).json("success")
                    : res.status(500).json("error");
                break;

            case "GET":
                const data = await Hours.findOne()
                res.status(200).json(data);
                break;
        }
    }
    catch (error) {
        res.status(500).json(errorHandler(error));
    }
}