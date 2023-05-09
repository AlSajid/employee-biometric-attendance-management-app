import connect from "./connect";
import database from "./database";

export default async function handler(req, res) {
    const { id, ips } = req.body;

    try {
        const { zkInstance } = await connect(ips);
        await zkInstance.deleteUser(id)


        const deleteUser = await database.collection("users").deleteOne({ id })

        if (deleteUser.acknowledged && deleteUser.deletedCount === 1) {
            res.status(200).json({ message: "success" })
            return;
        }
    }
    catch {
        console.log("error")
    }

    res.status(200).json({ message: "failed" })
}