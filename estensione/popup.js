chrome.storage.local.get(["totalDataUsed"], (result) => {
  let usedMB = (result.totalDataUsed / (1024 * 1024)).toFixed(2);
  document.getElementById("dataUsed").textContent = `Hai usato ${usedMB} MB di dati.`;
});
