chrome.storage.local.get(["totalDataUsed"], (result) => {
  let usedMB = (result.totalDataUsed / (1024 * 1024)).toFixed(2);
  
  if(isNaN(usedMB))
  {
    usedMB = 0;
  }

  document.getElementById("dataUsed").textContent = `Hai usato ${usedMB} MB di dati, circa ${(usedMB * 5).toFixed(2)}g di CO2.`;
});
