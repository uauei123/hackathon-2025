const pool = require("../models/db");
const { calculateCarbonFootprint } = require("../utils/carbonCalculator");

async function submitTest(req, res) {
    try {
        const answers = req.body;

        console.log("Dati ricevuti:", answers); // DEBUG: Controlla i dati ricevuti

        // Converti i valori in numeri e cast a int per i campi necessari
        const streamingHours = parseInt(answers.streaming_hours);
        const socialHours = parseInt(answers.social_hours);
        const emailsSent = parseInt(answers.emails_sent);
        const gamingHours = parseInt(answers.gaming_hours);
        const cloudUsage = parseInt(answers.cloud_usage);

        // Calcola la CO2, assicurandoti che il valore sia un numero valido
        const { totalCO2, earthsNeeded } = calculateCarbonFootprint({
            streaming_hours: streamingHours,
            social_hours: socialHours,
            emails_sent: emailsSent,
            gaming_hours: gamingHours,
            cloud_usage: cloudUsage,
        });

        if (isNaN(totalCO2)) {
            console.log(totalCO2);
            return res.status(400).json({ error: "Errore nel calcolo della CO2: valore NaN" });
        }

        // Query per l'inserimento nel database
        const result = await pool.query(
            "INSERT INTO user_tests (email, streaming_hours, social_hours, emails_sent, gaming_hours, cloud_usage, total_co2) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [
                answers.email,
                streamingHours,
                socialHours,
                emailsSent,
                gamingHours,
                cloudUsage,
                totalCO2,
            ]
        );

        res.json({ message: "Test salvato!", data: result.rows[0], earthsNeeded});
    } catch (error) {
        console.error("Errore nel server:", error);
        console.error("Dati ricevuti con errore:", req.body);
        res.status(500).json({ error: "Errore nel salvataggio" });
    }
}

module.exports = { submitTest };