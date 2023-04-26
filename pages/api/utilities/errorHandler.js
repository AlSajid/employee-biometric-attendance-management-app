export default function errorHandler(error) {
    let msg;
    console.log({ error: error })

    switch (error.code) {
        case "ECONNREFUSED":
        case "ENOTFOUND":
        case "EREFUSED":
        case "ETIMEOUT":
            msg = "Internet connection is interrupted";
            break

        case 11000:
            res.status(200).json({ message: "This user ID already exists" })
            break;

        default:
            msg = "Something went Wrong";
    }

    return { error: msg };
}