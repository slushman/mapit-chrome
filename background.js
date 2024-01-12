function getMapUrl(mapPref, selected) {
  if (mapPref === "apple") {
    const url = new URL("https://maps.apple.com/");
    url.searchParams.append("q", selected);
    return url;
  } else if (mapPref === "bing") {
    const url = new URL("https://www.bing.com/maps");
    url.searchParams.append("where", selected);
    return url;
  } else if (mapPref === "googleearth") {
    return new URL(selected, "https://earth.google.com/web/search/");
  } else if (mapPref === "herewego") {
    return new URL(selected, "https://wego.here.com/discover/");
  } else if (mapPref === "mapquest") {
    return new URL(selected, "https://www.mapquest.com/search/");
  } else if (mapPref === "openstreetmap") {
    const url = new URL("https://www.openstreetmap.org/search");
    url.searchParams.append("query", selected);
    return url;
  } else if (mapPref === "zillow") {
    return new URL(selected, "https://www.zillow.com/homes/");
  } else {
    const url = new URL("https://maps.google.com/maps");
    url.searchParams.append("q", selected);
    return url;
  }
}

function getAllStorageSyncData(top_key) {
  // Immediately return a promise and start asynchronous work
  return new Promise((resolve, reject) => {
    // Asynchronously fetch all data from storage.sync.
    chrome.storage.sync.get(top_key, (items) => {
      // Pass any observed errors down the promise chain.
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      // Pass the data retrieved from storage down the promise chain.
      resolve(items);
    });
  });
}

/**
 * Returns a handler which will open a new window when activated.
 */
async function getClickHandler(item, tab) {
  const mapPref = await getAllStorageSyncData("mapPreference");
  const url = getMapUrl(mapPref.mapPreference, item.selectionText).toString();

  // Create a new tab to the info page.
  chrome.tabs.create({ url });
}

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    contexts: ["selection"],
    id: "slushman_mapit",
    title: chrome.i18n.getMessage("map_it"),
    type: "normal",
  });
});

chrome.contextMenus.onClicked.addListener(getClickHandler);
