// ==UserScript==
// @name         XLight.js
// @namespace    https://github.com/Nevylish/X-Light
// @version      1.1.3
// @description  An extension to customize your experience on X/Twitter by removing unwanted elements.
// @author       Nevylish (bonjour@nevylish.ch)
// @match        https://twitter.com/*
// @grant        none
// @downloadURL  https://gist.githubusercontent.com/Nevylish/59a2ec787df131b1de1ffca8b3e9e8c6/raw/f4571bda0cb107c35693cd33ce7bd8a531688bba/XLight.js
// @updateURL    https://gist.githubusercontent.com/Nevylish/59a2ec787df131b1de1ffca8b3e9e8c6/raw/f4571bda0cb107c35693cd33ce7bd8a531688bba/XLight.js
// ==/UserScript==

const preferences = {
    hideHeader: false, /* Hide Header */
    hidePremium: false, /* Hide Premium tab & button */
    hideSuggestions: false, /* Hide Suggestions tab */
    hideTrends: false /* Hide Trends tab*/
};

const applyUserPreferences = () => {
    const selectors = {
        hideHeader: ['.r-1gn8etr > div:nth-child(1) > div:nth-child(1)', '.r-1ljd8xs > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)'],
        hidePremium: ['aside.r-1habvwh', 'a.css-1dbjc4n:nth-child(7)', 'a.css-4rbku5:nth-child(8)', 'div.r-g2wdr4:nth-child(3)'],
        hideSuggestions: ['div.r-g2wdr4:nth-child(4)'],
        hideTrends: ['div.r-g2wdr4:nth-child(5)', 'a.css-1dbjc4n:nth-child(2)'],
    };

    for (const preference in selectors) {
        if (preferences[preference]) {
            selectors[preference].forEach((selector) => {
                const element = document.querySelector(selector);
                if (element) {
                    element.style.display = 'none';
                }
            });
        }}
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

applyUserPreferences();