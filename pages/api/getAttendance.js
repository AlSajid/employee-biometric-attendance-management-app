import connect from "./connect"
import errorHandler from "./utilities/errorHandler";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":

            const ips = req.body
            const { zkInstance } = await connect(ips);
            console.log(ips)
            if (ips.length === 0) {
                res.status(500).json({ error: "No device is connected" })
            }

            try {
                const attendance = await zkInstance.getAttendances()
                zkInstance.clearAttendanceLog()

                res.send(attendance.data)
            }
            catch (error) {
                const msg = errorHandler(error)
                if (msg.error === "Something went Wrong")
                    res.status(500).json([])
                else
                    res.status(500).json(msg)
            }
    }
}