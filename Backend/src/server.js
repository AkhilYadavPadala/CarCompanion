import cors from 'cors';
import express from 'express';
import { connectToDB, db } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
    res.json("server is running successfully!");
});

app.post('/ast', async (req, res) => {
    try {
        const result = await db.collection("ast").find().toArray();
        res.json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.post('/signin', async (req, res) => {
    try {
        console.log("Login Request Data:", req.body); // Debugging request data

        const user = await db.collection("ast").findOne({ Gmail: req.body.Gmail });
        console.log("User Found:", user); // Debugging fetched user

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log("Comparing passwords:", user.Password, req.body.password); // Debugging password check

        if (user.Password === req.body.password) {  // Use correct field name
            return res.json({ message: "Login success", values: user });
        } else {
            return res.status(401).json({ error: "Incorrect password" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Failed to sign in" });
    }
});


app.post('/signup', async (req, res) => {
    try {
        const result = await db.collection("ast").insertOne({ Gmail: req.body.Gmail, Password: req.body.Password });
        if (result) {
            res.json({ message: "Signup success", values: result });
        } else {
            res.json({ error: "Failed" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Failed to sign up" });
    }
});

connectToDB(() => {
    app.listen(9000, () => {
        console.log("server running at 9000");
    });
});
