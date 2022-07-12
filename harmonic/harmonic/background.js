chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	let licpUrl = JSON.stringify(tab.url);
	console.log(tab.openerTabId);
	licpUrl.includes("https://www.linkedin.com/sales/company")
		? chrome.tabs.query({ active: true, currentWindow: true }, function () {
				chrome.tabs.sendMessage(tab.openerTabId, { licpUrl });
		  })
		: console.log(false);
});
