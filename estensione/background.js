let totalDataUsed = 0;

chrome.webRequest.onCompleted.addListener(
  function(details) {
    let dataSize = details.responseHeaders
      ? details.responseHeaders.reduce((acc, header) => {
          if (header.name.toLowerCase() === "content-length") {
            acc = parseInt(header.value, 10);
          }
          return acc;
        }, 0)
      : 0;

    if (dataSize > 0) {
      totalDataUsed += dataSize;
      chrome.storage.local.set({ totalDataUsed });
    }
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);

// Carica i dati già salvati
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["totalDataUsed"], (result) => {
    if (result.totalDataUsed) {
      totalDataUsed = result.totalDataUsed;
    }
  });
});
