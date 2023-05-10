import {connectDb} from "./db";
import Attendance from "./models/attendance";
import errorHandler from "./utilities/errorHandler"

export default async function handler(req, res) {
    const { attendance } = req.body

    try {
        await connectDb()
        const insert = await Attendance.insertMany(attendance)

        if (insert.acknowledged && insert.insertedCount > 0) {
            res.status(200).json({ message: "success" })
            return;
        }
    }
    catch (error) {
        res.status(500).json(errorHandler(error))
        return;
    }
}