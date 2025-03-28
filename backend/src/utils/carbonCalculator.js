function calculateCarbonFootprint(answers) {
    const co2Factors = {
      streaming: 400, // g CO₂ per ora di streaming HD
      social: 50, // g CO₂ per ora di social browsing
      email: 4, // g CO₂ per email inviata
      gaming: 80, // g CO₂ per ora di gaming online
      cloud: {
        high: 2000,
        medium: 1000,
        low: 500,
        none: 0,
      },
    };
  
    const totalCO2 =
      answers.streaming_hours * co2Factors.streaming +
      answers.social_hours * co2Factors.social +
      answers.emails_sent * co2Factors.email +
      answers.gaming_hours * co2Factors.gaming +
      co2Factors.cloud[answers.cloud_usage];
  
    return totalCO2 / 1000; // Convertiamo in Kg CO₂
  }
  
  module.exports = { calculateCarbonFootprint };