"use strict";

// Saves options to chrome.storage
const saveOptions = () => {
  const mapPref = document.getElementById("mapPref").value;

  chrome.storage.sync.set({ mapPreference: mapPref }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById("status");
    status.textContent = "Map preference saved";
    setTimeout(() => {
      status.textContent = "";
    }, 750);
  });
};

const restoreOptions = () => {
  chrome.storage.sync.get({ mapPreference: "google" }, (items) => {
    document.getElementById("mapPref").value = items.mapPreference;
  });
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
