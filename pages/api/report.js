import database from "./database"
import errorHandler from "./utilities/errorHandler"

export default async function handler(req, res) {
    const { userID, filter } = req.body

    if (filter.start === "")
        filter.start = "1900-01-01"

    if (filter.end === "")
        filter.end = "2500-01-01"

    try {
        const hours = await database.collection('hours').findOne()
        const attendance = await database.collection('attendance').find(
            { deviceUserId: userID }
        ).toArray()

        res.status(200).json({ attendance, hours })
    }
    catch (error) {
        res.status(500).json(errorHandler(error))
    }

}