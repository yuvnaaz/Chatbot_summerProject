// background.js

// Log when the extension is first installed or updated
chrome.runtime.onInstalled.addListener(() => {
    console.log("AI Browser Companion Service Worker installed successfully.");
});

// Listen for when the user clicks the extension icon in the Chrome toolbar
chrome.action.onClicked.addListener(async (tab) => {
    // Prevent the extension from trying to run on restricted internal browser pages
    if (tab.url.startsWith("chrome://") || tab.url.startsWith("edge://") || tab.url.startsWith("about:")) {
        console.warn("AI Browser Companion cannot run on restricted browser pages.");
        return;
    }

    try {
        // Send a message to the content script (content.js) on the active tab
        // instructing it to open or close the floating sidebar.
        await chrome.tabs.sendMessage(tab.id, { action: "toggleSidebar" });
        console.log("Toggle message sent to content script.");
        
    } catch (error) {
        // If the message fails, it usually means the page was opened before the 
        // extension was installed, or the page hasn't fully loaded yet.
        console.error("Could not reach the content script. The user may need to refresh the page.", error);
    }
});