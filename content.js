console.log("Script loaded");

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded event fired");
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
    }, 5000);
});

function replaceLikeButtons() {
    const likeButtons = document.querySelectorAll('div.css-175oi2r.r-xoduu5.r-1p0dtai.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-1niwhzg.r-sdzlij.r-xf4iuw.r-o7ynqc.r-6416eg.r-1ny4l3l');
    console.log(`Found ${likeButtons.length} like buttons`);
    likeButtons.forEach(button => {
        const img = document.createElement('img');
        img.src = 'https://raw.githubusercontent.com/8D1/Yeah-Ext/master/yeah.png'; // External URL for the image
        img.style.width = '20px'; // Set the width of the new like button
        img.style.height = '20px'; // Set the height of the new like button

        if (button.parentNode) {
            button.parentNode.replaceChild(img, button);
            console.log("Replaced a like button");
        }
    });
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
                const newLikeButtons = node.querySelectorAll('div.css-175oi2r.r-xoduu5.r-1p0dtai.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-1niwhzg.r-sdzlij.r-xf4iuw.r-o7ynqc.r-6416eg.r-1ny4l3l');
                if (newLikeButtons.length > 0) {
                    replaceLikeButtons();
                }
            }
        });
    });
});

setTimeout(replaceLikeButtons, 2500);
