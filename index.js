require("dotenv").config();
console.log("ENV CHECK:", process.env.GROQ_API_KEY);
const express = require("express");
const cors = require("cors");

const {
    getFibonacci,
    getPrimes,
    getHCF,
    getLCM,
    getAIResponse,
} = require("./utils");

const app = express();
const PORT = process.env.PORT || 3000;
const OFFICIAL_EMAIL = process.env.EMAIL;

app.use(cors());
app.use(express.json());

// ---------------- HEALTH ----------------
app.get("/health", (req, res) => {
    res.status(200).json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
    });
});

// ---------------- BFHL ----------------
app.post("/bfhl", async (req, res) => {
    try {
        const keys = Object.keys(req.body);
        if (keys.length !== 1) {
            return res.status(400).json({
                is_success: false,
                error: "Provide exactly one key",
            });
        }

        const key = keys[0];
        const value = req.body[key];
        let data;

        switch (key) {
            case "fibonacci":
                data = getFibonacci(value);
                break;

            case "prime":
                data = getPrimes(value);
                break;

            case "lcm":
                data = getLCM(value);
                break;

            case "hcf":
                data = getHCF(value);
                break;

            case "AI":
                if (!process.env.GROQ_API_KEY) {
                    return res.status(500).json({
                        is_success: false,
                        error: "Groq API key missing",
                    });
                }
                data = await getAIResponse(value, process.env.GROQ_API_KEY);
                break;

            default:
                return res.status(400).json({
                    is_success: false,
                    error: "Invalid operation",
                });
        }

        res.json({
            is_success: true,
            official_email: OFFICIAL_EMAIL,
            data: data,
        });
    } catch (err) {
        console.error("SERVER ERROR:", err.message);
        res.status(500).json({
            is_success: false,
            error: "Internal Server Error",
        });
    }
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;
