import database from "./database";
import errorHandler from "./utilities/errorHandler";

export default async function handler(req, res) {
  const { userID, filter } = req.body;
  const { start, end } = filter;
  console.log(userID, filter);

  const startDate = new Date(`${start}T00:00:00.000+06:00`);
  const endDate = new Date(`${end}T00:00:00.000+06:00`);

  try {
    const hours = await database.collection("hours").findOne();
    const attendance = await database
      .collection("attendances")
      .find({
        deviceUserId: userID,
        recordTime: { $gte: startDate, $lte: endDate },
      })
      .toArray();

    res.status(200).json({ attendance, hours });
  } catch (error) {
    res.status(500).json(errorHandler(error));
  }
}
