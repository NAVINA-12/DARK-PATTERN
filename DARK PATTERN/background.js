// background.js

chrome.runtime.onInstalled.addListener(function () {
    // Add an event listener to trigger price fetching when the extension is installed or updated
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      // Check if the page has finished loading
      if (changeInfo.status === 'complete') {
        // Check if the page is a Flipkart checkout page (modify the URL pattern accordingly)
        if (tab.url.includes('https://www.flipkart.com/checkout/init?otracker=browse')) {
          // Execute the content script to fetch price details
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: fetchPriceDetails
          }, (injectionResults) => {
            const priceDetails = injectionResults[0].result;
            // Send the price details to the popup script
            chrome.runtime.sendMessage({ priceDetails });
          });
        }
      }
    });
  });
  
  // Content script to fetch price details (same as popup.js)
  function fetchPriceDetails() {
    {
      const buyNowButton = document.querySelector("#container > div > div._2c7YLP.UtUXW0._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div._1YokD2._3Mn1Gg.col-5-12._78xt5Y > div:nth-child(2) > div > ul > li:nth-child(2)");
      if (buyNowButton) {
          buyNowButton.click();
      }
    // (Same code as in popup.js for fetching price details)
    const priceElement = document.querySelector("#container > div > div._1eztQ7 > div > div._2E_sHl._1G1ZOh.dimARw._3M1kzW > div > div._35mLK5 > div._I_XQO > div:nth-child(1) > div.z4Ha90 > span > div > div > div");
    const deliveryChargesElement = document.querySelector("#container > div > div._1eztQ7 > div > div._2E_sHl._1G1ZOh.dimARw._3M1kzW > div > div._35mLK5 > div._I_XQO > div:nth-child(2) > div.z4Ha90 > span");
    const taxesElement = document.querySelector("#container > div > div._1eztQ7 > div > div._2E_sHl._1G1ZOh.dimARw._3M1kzW > div > div._35mLK5 > div._I_XQO > div:nth-child(3) > div.z4Ha90 > span");
    const packageElement = document.querySelector("#container > div > div._1eztQ7 > div > div._2E_sHl._1G1ZOh.dimARw._3M1kzW > div > div._35mLK5 > div._I_XQO > div:nth-child(4) > div.z4Ha90 > span");
    const totalElement = document.querySelector("#container > div > div._1eztQ7 > div > div._2E_sHl._1G1ZOh.dimARw._3M1kzW > div > div._35mLK5 > div._I_XQO > div._3LxTgx > div > div.z4Ha90 > span > div > div > div");
    let price = priceElement ? priceElement.textContent.trim() : "N/A";
    let deliveryCharges = deliveryChargesElement ? deliveryChargesElement.textContent.trim() : "N/A";
    let taxes = taxesElement ? taxesElement.textContent.trim() : "N/A";
    let packages = packageElement ? packageElement.textContent.trim() : "No Packaging charge";
    let total = totalElement ? totalElement.textContent.trim() : "N/A";
    return {
      price,
      deliveryCharges,
      taxes,
      packages,
      total
    };
  }}
  