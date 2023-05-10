import { connectDb } from "./db";
import Attendance from "./models/attendance";
import errorHandler from "./utilities/errorHandler"

export default async function handler(req, res) {
    const { attendance } = req.body;
    console.log("data:" + attendance)
    res.status(200).json({ message: "success" })


    // try {
    //     await connectDb()
    //     const insert = await Attendance.insertMany(attendance)
    //     console.log(insert);
    //     console.log(attendance)

    //     if (insert.acknowledged && insert.insertedCount > 0) {
    //         res.status(200).json({ message: "success" })
    //         return;
    //     } else {
    //         res.status(500).json({ message: "failed" })
    //         return;
    //     }
    // }
    // catch (error) {
    //     res.status(500).json(errorHandler(error))
    //     return;
    // }
}