import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

app.post("/", async (req, res) => {
    const { chats } = req.body;

    try {
        const result = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "you are my fireBot !!",
                },
                ...chats,
            ],
        });

        res.json({
            output: result.choices[0].message,
        });
    } catch (error) {
        console.error("Error creating completion:", error);
        res.status(500).json({ error: "Error creating completion" });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
