import database from "./database"
import errorHandler from "./utilities/errorHandler"

export default async function handler(req, res) {
    const { date } = req.body
    console.log(date)

    try {
        const hours = await database.collection('hours').findOne()
        const attendance = await database.collection('attendance').find({recordTime: date}).toArray()
        console.log(attendance)

        res.status(200).json({ attendance, hours })
    }
    catch (error) {
        res.status(500).json(errorHandler(error))
    }

}