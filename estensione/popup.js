document.getElementById('refreshButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'getHashedData' }, (response) => {
      document.getElementById('dataUsage').textContent = response.hash;
    });
  });
  