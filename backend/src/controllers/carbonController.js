const pool = require("../models/db");
const { calculateCarbonFootprint } = require("../utils/carbonCalculator");

async function submitTest(req, res) {
    try {
        const answers = req.body;

        console.log("Received data:", answers); // DEBUG: Check the received data

        // Convert values to numbers and cast to int for necessary fields
        const streamingHours = parseInt(answers.streaming_hours);
        const socialHours = parseInt(answers.social_hours);
        const emailsSent = parseInt(answers.emails_sent);
        const gamingHours = parseInt(answers.gaming_hours);
        const cloudUsage = parseInt(answers.cloud_usage);
        const musicHours = parseInt(answers.music_hours); // Added for music calculation
        const callHours = parseInt(answers.call_hours); // Added for call calculation

        // Calculate CO2, ensuring that the value is a valid number
        const { totalCO2, earthsNeeded } = calculateCarbonFootprint({
            streaming_hours: streamingHours,
            social_hours: socialHours,
            emails_sent: emailsSent,
            gaming_hours: gamingHours,
            cloud_usage: cloudUsage,
            music_hours: musicHours,
            call_hours: callHours,
        });

        // Check if totalCO2 is a valid number, and return an error if not
        if (isNaN(totalCO2)) {
            console.log(totalCO2);
            return res.status(400).json({ error: "CO2 calculation error: NaN value" });
        }

        // Query to insert data into the database
        const result = await pool.query(
            "INSERT INTO user_tests (email, streaming_hours, social_hours, emails_sent, gaming_hours, cloud_usage, music_hours, call_hours, total_co2) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [
                answers.email,
                streamingHours,
                socialHours,
                emailsSent,
                gamingHours,
                cloudUsage,
                // Add new fields here if needed
                musicHours,
                callHours,
                totalCO2,
            ]
        );

        res.json({ message: "Test saved!", data: result.rows[0], earthsNeeded });
    } catch (error) {
        console.error("Server error:", error);
        console.error("Received erroneous data:", req.body);
        res.status(500).json({ error: "Error saving data" });
    }
}

module.exports = { submitTest };