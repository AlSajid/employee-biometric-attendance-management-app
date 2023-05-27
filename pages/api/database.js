import { MongoClient } from "mongodb";

const uri = `mongodb+srv://AlSajid:MonirBhai@biometric-attendance.pji39yi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const database = client.db("biometric-attendance")

export default database;