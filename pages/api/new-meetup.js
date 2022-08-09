import { MongoClient } from "mongodb";

async function apiHandler(req, res) {
    if (req.method === "POST") {
        const data = req.body;
        
        const client = await MongoClient.connect(
            "mongodb+srv://darkInvader:GcMS1s0brifU9o7P@cluster0.tgfps.mongodb.net/meetups?retryWrites=true&w=majority"
        );

        const db = client.db();
        const meetupsCollection = db.collection("meetups");
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();

        res.status(201).json({ message: "Meetup Inserted!" });
    }
}

export default apiHandler;


