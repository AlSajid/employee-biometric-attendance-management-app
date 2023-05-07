import connect from './connect';
import database from './database';
import errorHandler from './utilities/errorHandler';

export default async function handler(req, res) {
    const { name, ips } = req.body;
    const { zkInstance, connected } = await connect(ips);

    if (connected.length === 0) {
        res.status(500).json({ error: "No device is connected" });
        return;
    }

    try {
        await zkInstance.setUser(name, "", id, id);
        const insert = await database.collection('users').insertOne(req.body);

        if (insert.acknowledged && insert.insertedId) {
            res.status(200).json({ message: "success" })
            return;
        }
    }
    catch (error) {
        res.status(500).json(errorHandler(error))
    }
}