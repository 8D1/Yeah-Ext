console.log("Script loaded");

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded event fired");
    // Adding a 5-second delay before executing replaceLikeButtons
    setTimeout(() => {
        console.log("5-second delay completed");
        try {
            replaceLikeButtons();
            console.log("Initial replaceLikeButtons call made");

            observer.observe(document.body, { childList: true, subtree: true });
            console.log("Observer started");
        } catch (error) {
            console.error('Failed to replace like buttons:', error);
        }
    }, 5000); // Delay of 5 seconds
});

function replaceLikeButtons() {
    const likeButtons = document.querySelectorAll('svg.r-4qtqp9.r-yyyyoo.r-dnmrzs.r-bnwqim.r-lrvibr.r-m6rgpd.r-1xvli5t.r-1hdv0qi');
    console.log(`Found ${likeButtons.length} like buttons`);
    likeButtons.forEach(button => {
        // Create an image element
        const img = document.createElement('img');
        img.src = chrome.runtime.getURL('yeah.png'); // Ensure the file name matches your PNG file
        img.style.width = '20px'; // Set the width of the new like button
        img.style.height = '20px'; // Set the height of the new like button

        // Replace the SVG with the new PNG image
        if (button.parentNode) {
            button.parentNode.replaceChild(img, button);
            console.log("Replaced a like button");
        }
    });
}

// MutationObserver to observe changes in the DOM
const observer = new MutationObserver((mutations) => {
    console.log("MutationObserver callback triggered");
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
                const newLikeButtons = node.querySelectorAll('svg.r-4qtqp9.r-yyyyoo.r-dnmrzs.r-bnwqim.r-lrvibr.r-m6rgpd.r-1xvli5t.r-1hdv0qi');
                if (newLikeButtons.length > 0) {
                    console.log("New like button(s) added");
                    replaceLikeButtons();
                }
            }
        });
    });
});

// Ensure that replaceLikeButtons is called initially
setTimeout(replaceLikeButtons, 5000); // Adding a 5-second delay before the initial call
