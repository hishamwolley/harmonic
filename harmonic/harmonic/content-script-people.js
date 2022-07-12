const waitForAddedNode = (params) => {
	new MutationObserver(function (mutations) {
		const el = document.querySelectorAll(params.selector);
		if (el) {
			params.done(el);
		}
		if (el.length === 25) {
			this.disconnect();
		}
	}).observe(params.parent || document, {
		subtree: !!params.recursive || !params.parent,
		childList: true,
	});
};

waitForAddedNode({
	selector: "a[data-control-name='view_company_via_profile_lockup']",
	parent: document.querySelector("ol[artdeco-list]"),
	recursive: false,
	done: (el) => {
		for (const value of el.values()) {
			let companyName = value.textContent.trim();
			getStorageKeyValue(companyName, (key) => {
				if (key && document.getElementById(value.id)) {
					document.getElementById(value.id).classList +=
						"bgColor rounded-md p-4 ";
				}
			});
			value.setAttribute("target", "_blank");
			document.getElementById(value.id).addEventListener("click", () => {
				document.getElementById(value.id).classList +=
					"bgColor rounded-md p-4 ";
				setStorageKey(companyName, companyName);
			});
		}
	},
});

const setStorageKey = (key, value) => {
	console.log(key, value);
	chrome.storage.sync.set({ [key]: value });
};

const getStorageKeyValue = (key, onGetStorageKeyValue) => {
	chrome.storage.sync.get([key], function (result) {
		onGetStorageKeyValue(result[key]);
	});
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	const licpUrl = request.licpUrl
		.replace("https://www.linkedin.com", "")
		.split("&")[0]
		.replace(/["]+/g, "");

	const allLicpUrls = document.querySelectorAll(
		"a[data-control-name='view_company_via_profile_lockup']"
	);

	for (const companyProfile of allLicpUrls) {
		let companyProfileHref = companyProfile.getAttribute("href");
		if (companyProfileHref === licpUrl) {
			document.getElementById(companyProfile.id).classList +=
				"bgColor rounded-md p-4 ";
			let companyName = companyProfile.textContent.trim();
			getStorageKeyValue(companyName, (key) => {
				if (!key) {
					setStorageKey(companyName, companyName);
				}
			});
		}
	}
	//Keeping sendResponse below for testing purposes
	sendResponse({ farewell: "goodbye" });
});
