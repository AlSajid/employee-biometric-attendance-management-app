import database from "./database";
import { connectDb } from "./db";
import Leave from "./models/leave";
import errorHandler from "./utilities/errorHandler";

export default async function handler(req, res) {
  try {
    await connectDb();

    switch (req.method) {
      case "POST":
        const { id } = req.body;
        const user = await database.collection("users").findOne({ id });
        if (!user) {
          res.status(400).json({ error: "This userID do not exist" });
          return;
        }

        const result = await Leave.create({ ...req.body });
        res.status(200).json({ message: "Leave Applied Successfully" });
        break;

      case "GET":
        const data = await Leave.aggregate([
          {
            $lookup: {
              from: "users",
              localField: "id",
              foreignField: "id",
              as: "user",
            },
          },
          {
            $unwind: "$user",
          },
          {
            $project: {
              "user.name": 1,
              "user.designation": 1,
              "user.department": 1,
              date: 1,
              id: 1,
            },
          },
        ]);
        console.log(data);
        res.status(200).json(data);
        break;
    }
  } catch (error) {
    res.status(500).json(errorHandler(error));
  }
}
