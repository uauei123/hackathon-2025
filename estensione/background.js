let totalDataUsed = 0; // Store the total data used in bytes

// Listen for all network requests
chrome.webRequest.onCompleted.addListener((details) => {
  // Add the responseBytes to the total data count
  if (details.responseHeaders) {
    const contentLengthHeader = details.responseHeaders.find(header => header.name.toLowerCase() === 'content-length');
    if (contentLengthHeader && contentLengthHeader.value) {
      totalDataUsed += parseInt(contentLengthHeader.value, 10);
    }
  }
}, {urls: ["<all_urls>"]});

// Function to hash the total data used and return it in Base64
function getHashedData() {
  const data = totalDataUsed.toString();
  return hashData(data);
}

// A simple hashing function (SHA-256 for example)
function hashData(data) {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  return crypto.subtle.digest('SHA-256', dataBuffer).then((hashBuffer) => {
    // Convert the buffer to a Base64 string
    return bufferToBase64(hashBuffer);
  });
}

// Helper function to convert ArrayBuffer to Base64
function bufferToBase64(buffer) {
  const uint8Array = new Uint8Array(buffer);
  let binary = '';
  uint8Array.forEach(byte => binary += String.fromCharCode(byte));
  return btoa(binary); // Convert to Base64
}

// Expose the hashed data for the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getHashedData') {
    getHashedData().then((hash) => {
      sendResponse({hash: hash});
    });
    return true; // This keeps the message channel open for asynchronous response
  }
});
