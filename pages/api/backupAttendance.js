import database from "./database"
import errorHandler from "./utilities/errorHandler"

export default async function handler(req, res) {
    const { attendance } = req.body

    const modifiedAttendance = attendance.map(obj => {
        return {
            userSn: obj.userSn,
            deviceUserId: obj.deviceUserId,
            recordTime: new Date(obj.recordTime),
            ip: obj.ip
        }
    })

    try {
        const insert = await database.collection('attendance').insertMany(modifiedAttendance)

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