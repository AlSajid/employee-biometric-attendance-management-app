import database from "./database"

export default async function handler(req, res) {
    try {
        const users = await database.collection("users").find().toArray()
        res.status(200).json(users)
        return;
    }
    catch (error) {
        console.log("error: ", error.code)

        switch (error.code){
            case "ECONNREFUSED":
                res.status(500).json({ error: "Your Internet session was interrupted" })
                break;

            default:
                res.status(500).json({error: "Something went Wrong"})
        }
        return;    
    }   
}