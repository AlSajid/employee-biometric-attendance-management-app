import database from "./database"

export default async function handler(req, res) {
    const { attendance } = req.body

    const insert = await database.collection('attendance').insertMany(attendance)
    console.log(insert)
    res.status(200).json({ success: true })
}