function calculateCarbonFootprint(answers) {
  const co2Factors = {
    streaming: 400, // g CO₂ per ora di streaming HD
    social: 50, // g CO₂ per ora di social browsing
    email: 4, // g CO₂ per email inviata
    gaming: 80, // g CO₂ per ora di gaming online
    cloud: 20 // g CO₂ per ora di utilizzo di servizi cloud
  };

  const streamingHours = parseInt(answers.streaming_hours);
  const socialHours = parseInt(answers.social_hours) ;
  const emailsSent = parseInt(answers.emails_sent) ;
  const gamingHours = parseInt(answers.gaming_hours);
  const cloudUsage = parseInt(answers.cloud_usage);

  // Calcolo emissioni CO2
  const totalCO2 =
      streamingHours * co2Factors.streaming +
      socialHours * co2Factors.social +
      emailsSent * co2Factors.email +
      gamingHours * co2Factors.gaming +
      cloudUsage * co2Factors.cloud;

  return parseInt(totalCO2 / 1000); // Convertiamo in Kg CO₂
}

module.exports = { calculateCarbonFootprint };