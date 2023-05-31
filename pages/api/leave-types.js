import { connectDb } from "./db";
import LeaveType from "./models/leaveTypes";
import errorHandler from "./utilities/errorHandler";

export default async function handler(req, res) {
  try {
    await connectDb();

    switch (req.method) {
      case "POST":
        const result = await LeaveType.create({ ...req.body });
        res.status(200).json({ message: "Leave Type Added Successfully" });
        break;

      case "GET":
        const data = await LeaveType.find({});
        console.log("data" + data);
        res.status(200).json(data);
        break;
    }
  } catch (error) {
    res.status(500).json(errorHandler(error));
  }
}
