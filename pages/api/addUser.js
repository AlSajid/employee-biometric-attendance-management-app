import connect from './connect';
import database from './database';

export default async function handler(req, res) {
    const { name, id, ips } = req.body;
    const { zkInstance, connected } = await connect(ips);

    try {
        await zkInstance.setUser(name, "", id, id);
        const insert = await database.collection('users').insertOne({ name, id });

        if (insert.acknowledged && insert.insertedId) {
            res.status(200).json({ message: "success" })
            return;
        }
    }
    catch (err) {
        console.log(err);

        switch (err.code){
            case 11000:
                res.status(200).json({ message: "This user ID already exists" })
                break;
            default:
                res.status(200).json({ message: "Something went wrong" })
        }
    }


}