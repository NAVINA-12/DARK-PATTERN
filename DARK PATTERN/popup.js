document.getElementById('fetch-details').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: fetchPriceDetails
      }, (injectionResults) => {
        const priceDetails = injectionResults[0].result;
        const priceDetailsElement = document.getElementById('price-details');
        priceDetailsElement.innerHTML = `
          Price: ${priceDetails.price}<br>
          Delivery Charges: ${priceDetails.deliveryCharges}<br>
       
          Packaging Charges: ${priceDetails.taxes}<br>
          Total: ${priceDetails.total}
        `;
      });
    });
  });
 
  function fetchPriceDetails() {
    
    // Modify this part to extract price, delivery charges, taxes, packaging charges, and total from the Flipkart checkout page
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
    // You may need to modify this part based on the actual structure of the Flipkart page
   // const total = parseFloat(price) + parseFloat(deliveryCharges) + parseFloat(taxes)+ parseFloat(packages);
 
    return {
      price,
      deliveryCharges,
      taxes,
      packages,
      total
    };
  }