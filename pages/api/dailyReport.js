import database from "./database"
import errorHandler from "./utilities/errorHandler"

function getNextDate(dateString) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export default async function handler(req, res) {
    const { date } = req.body;

    const startDate = new Date(`${date}T00:00:00.000+06:00`);
    const nextDate = new Date(`${getNextDate(date)}T00:00:00.000+06:00`);

    try {
        const company = await database.collection("company").findOne()
        const hours = await database.collection('hours').findOne()
        const users = await database.collection('users').aggregate([
            {
                $lookup: {
                    from: "attendances",
                    let: { userId: "$id", startDate: startDate, nextDate: nextDate },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$deviceUserId", "$$userId"] },
                                        { $gte: ["$recordTime", "$$startDate"] },
                                        { $lt: ["$recordTime", "$$nextDate"] }
                                    ]
                                }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                in: { $min: "$recordTime" },
                                out: { $max: "$recordTime" }
                            }
                        }
                    ],
                    as: "attendance"
                }
            },
            {
                $addFields: {
                    in: { $arrayElemAt: ["$attendance.in", 0] },
                    out: { $arrayElemAt: ["$attendance.out", 0] }
                }
            },
            {
                $unset: "attendance"
            }
        ]).toArray();

        res.status(200).json({ users, hours, company })
    }
    catch (error) {
        res.status(500).json(errorHandler(error))
    }

}