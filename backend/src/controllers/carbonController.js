const pool = require("../models/db");
const { calculateCarbonFootprint } = require("../utils/carbonCalculator");

async function submitTest(req, res) {
    try {
        const answers = req.body;
        const totalCO2 = calculateCarbonFootprint(answers);

        const result = await pool.query(
            "INSERT INTO user_tests (email, streaming_hours, social_hours, emails_sent, gaming_hours, cloud_usage, total_co2) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [
                answers.email,
                answers.streaming_hours,
                answers.social_hours,
                answers.emails_sent,
                answers.gaming_hours,
                answers.cloud_usage,
                totalCO2,
            ]
        );

        res.json({ message: "Test salvato!", data: result.rows[0] });
    } catch (error) {
        console.error(req.body);
        console.error(error);
        res.status(500).json({ error: "Errore nel salvataggio" });
    }
}

module.exports = { submitTest };