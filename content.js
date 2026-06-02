// content.js

let sidebarElement = null;

// Listen for the toggle command from background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleSidebar") {
        toggleSidebar();
    }
});

function toggleSidebar() {
    // TODO 1: Implement the sidebar toggling logic.
    // If the sidebar (sidebarElement) is already on the page, remove it and set sidebarElement to null.

    // TODO 2: Create the floating sidebar container (div with id "ai-companion-sidebar").

    // TODO 3: Create an iframe to host the extension's popup UI (popup.html).
    // Set the iframe src using chrome.runtime.getURL("popup.html") and style it to fit the container.

    // TODO 4: Append the iframe to the sidebar container, and append the sidebar container to the document body.

    // TODO 5: Extract all readable text from the current webpage (e.g., using document.body.innerText).

    // TODO 6: Save the extracted text to chrome.storage.local (under "currentPageText") so popup.js can retrieve it.

    console.log("TODO: Implement sidebar injection and text extraction inside toggleSidebar().");
}