import database from "./database"
import errorHandler from "./utilities/errorHandler"

export default async function handler(req, res) {
    const { userID, filter } = req.body;

    try {

        const hours = await database.collection('hours').findOne()
        const attendance = await database.collection('attendances').find(
            { deviceUserId: userID }
        ).toArray()

        console.log(attendance)

        res.status(200).json({ attendance, hours })
    }
    catch (error) {
        res.status(500).json(errorHandler(error))
    }
}