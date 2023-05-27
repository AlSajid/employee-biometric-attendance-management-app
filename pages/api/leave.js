import { connectDb } from "./db";
import Leave from "./models/leave";
import errorHandler from "./utilities/errorHandler";

export default async function handler(req, res) {
    console.log(req.body)
    try {
        await connectDb();
        console.log(req.body)
        switch (req.method) {
            case "POST":
                const result = await Leave.create({...req.body});

                (result.acknowledged === true)
                    ? res.status(200).json("success")
                    : res.status(500).json("error");
                break;

            case "GET":
                // const data = await le.findOne()
                // res.status(200).json(data);
                break;
        }
    }
    catch (error) {
        res.status(500).json(errorHandler(error));
    }
}