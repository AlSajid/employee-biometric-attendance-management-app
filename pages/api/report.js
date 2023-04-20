import database from "./database"

export default async function handler(req, res) {
    const { usersID } = req.body

    const hours = await database.collection('hours').findOne()

    const attendance = await database.collection('attendance').find({ id: usersID }).toArray()
    res.status(200).json({ attendance, hours })
}