function calculateCarbonFootprint(answers) {
  const co2Factors = {
    streaming: 200, // g CO₂ per ora di streaming HD
    social: 250,     // g CO₂ per ora di social browsing
    email: 4,       // g CO₂ per email inviata
    gaming: 250,     // g CO₂ per ora di gaming online
    cloud: 100,       // g CO₂ per giga caricati in cloud
    music:  100,
    call:  250,
  };

  // Convertiamo in numeri e assicuriamoci che valori non validi siano 0
  const streamingHours = parseInt(answers.streaming_hours);
  const socialHours = parseInt(answers.social_hours);
  const emailsSent = parseInt(answers.emails_sent);
  const gamingHours = parseInt(answers.gaming_hours);
  const cloudUsage = parseInt(answers.cloud_usage);
  const musicHours = parseInt(answers.music_hours); // Aggiunto per il calcolo della musica
  const callHours = parseInt(answers.call_hours); // Aggiunto per il calcolo delle chiamate

  // Calcolo emissioni CO2 settimanali (in grammi)
  const weeklyCO2 =
      (streamingHours * co2Factors.streaming +
      socialHours * co2Factors.social +
      emailsSent * co2Factors.email +
      gamingHours * co2Factors.gaming +
      cloudUsage * co2Factors.cloud +
      musicHours * co2Factors.music +
      callHours * co2Factors.call)*7; // Aggiunto per il calcolo delle chiamate

  // Convertiamo in kg e calcoliamo le emissioni annuali
  const weeklyCO2Kg = weeklyCO2 / 1000;
  const annualCO2 = weeklyCO2Kg * 52; // 52 settimane in un anno

  // Emissioni medie globali sostenibili per persona (stima)
  const avgGlobalCO2PerYear = 414; // kg CO₂ per anno

  // Calcolo dei Pianeti Terra necessari
  const earthsNeeded = annualCO2 / avgGlobalCO2PerYear;

  return {
    totalCO2: Math.floor(annualCO2), // Emissioni settimanali in kg (arrotondato)
    earthsNeeded: earthsNeeded.toFixed(2), // Pianeti necessari con 2 decimali
  };
}

module.exports = { calculateCarbonFootprint };