import connect from "./connect";

export default async function handler(req, res) {
    const { connected } = await connect(req.body);
    res.send(connected)
}