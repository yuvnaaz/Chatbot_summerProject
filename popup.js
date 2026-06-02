// Wrap everything inside DOMContentLoaded to ensure the HTML elements exist first
document.addEventListener("DOMContentLoaded", () => {

    async function sendMessage() {
        const input = document.getElementById("input");
        const responseBox = document.getElementById("response");

        // Safety check: ensure elements exist in the HTML
        if (!input || !responseBox) {
            console.error("Required HTML elements ('input' or 'response') were not found.");
            return;
        }

        const message = input.value.trim();
        
        // Prevent sending empty messages
        if (!message) return; 

        responseBox.innerText = "Loading...";

        try {
            // Retrieve the extracted page text that content.js saved
            const storageData = await chrome.storage.local.get("currentPageText");
            const pageText = storageData.currentPageText || "";

            const response = await fetch(
                "http://127.0.0.1:5000/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: message,
                        page_text: pageText 
                    })
                }
            );

            const data = await response.json();
            
            // Display the AI's answer
            responseBox.innerText = data.response;
            
            // Clear the input field for the next question
            input.value = "";

        } catch (error) {
            console.error("Fetch error:", error);
            responseBox.innerText = "Error connecting to backend";
        }
    }

    // Safely attach the event listener now that the DOM is ready
    const sendBtn = document.getElementById("sendBtn");
    if (sendBtn) {
        sendBtn.addEventListener("click", sendMessage);
    } else {
        console.error("Element with ID 'sendBtn' not found in HTML.");
    }

});