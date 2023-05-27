import { connectDb } from "./db";
import Hours from "./models/hours";
import errorHandler from "./utilities/errorHandler";

export default async function handler(req, res) {

    try {
        await connectDb();

        switch (req.method) {
            case "POST":
                const result = await Hours.updateOne(
                    {},
                    { ...req.body },
                    { upsert: true }
                );
                console.log(result);

                (result.acknowledged === true && result.modifiedCount === 1)
                    ? res.status(200).json("success")
                    : res.status(500).json("error");
                break;

            case "GET":
                const data = await Hours.findOne()
                
                if (data === null) {
                    res.status(200).json({});
                    return;
                }

                res.status(200).json(data);
                break;
        }
    }
    catch (error) {
        res.status(500).json(errorHandler(error));
    }
}