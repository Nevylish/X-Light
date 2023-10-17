const applyUserPreferences = () => {
    browser.storage.local.get(['hideHeader', 'hidePremium', 'hideSuggestions', 'hideTrends'], (result) => {
    const selectors = {
        hideTrends: ['div.r-g2wdr4:nth-child(5)', 'a.css-1dbjc4n:nth-child(2)'],
        hidePremium: ['div.r-g2wdr4:nth-child(3)', 'a.css-1dbjc4n:nth-child(7)', 'a.css-4rbku5:nth-child(8)'],
        hideHeader: ['.r-1gn8etr > div:nth-child(1) > div:nth-child(1)', '.r-1ljd8xs > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)'],
        hideSuggestions: ['div.r-g2wdr4:nth-child(4)']
    };
  
    for (const preference in selectors) {
        if (result[preference]) {
            selectors[preference].forEach((selector) => {
                const element = document.querySelector(selector);
                if (element) {
                    element.style.display = 'none';
                }
            });
        }}
    });
};
  
const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            applyUserPreferences();
        }
    }
});

const observerOptions = {
    childList: true,
    subtree: true,
};

observer.observe(document.body, observerOptions);

browser.runtime.onMessage.addListener((request) => {
    if (request.command === "applyPreferences") {
        applyUserPreferences();
    }
});

applyUserPreferences();

console.log('X Light extension loaded. Created by @Nevylish (bonjour@nevylish.ch).');
