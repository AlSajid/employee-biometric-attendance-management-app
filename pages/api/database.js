import { MongoClient } from "mongodb";

const uri = `mongodb+srv://AlSajid:J5p6oDQ5rWSOxERD@cluster0.xe6plxx.mongodb.net`;
const client = new MongoClient(uri);
const database = client.db("biometric-attendance")

export default database;