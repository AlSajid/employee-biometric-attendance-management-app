import connect from "./connect"

export default async function handler(req, res) {
    const ips = req.body

    const { zkInstance } = await connect(req.body);

    try {
        const attendance = await zkInstance.getAttendances()
        zkInstance.clearAttendanceLog()

        res.send(attendance.data)
    }
    catch (error) {
        res.json([])
    }
}