document.addEventListener('DOMContentLoaded', function () {
    const hideHeaderCheckbox = document.getElementById('hideHeader');
    const hidePremiumCheckbox = document.getElementById('hidePremium');
    const hideSuggestionsCheckbox = document.getElementById('hideSuggestions');
    const hideTrendsCheckbox = document.getElementById('hideTrends');
    const savePreferencesButton = document.getElementById('savePreferences');

    browser.storage.local.get(['hideHeader', 'hidePremium', 'hideSuggestions', 'hideTrends'], function (result) {
        hideHeaderCheckbox.checked = result.hideHeader;
        hidePremiumCheckbox.checked = result.hidePremium;
        hideSuggestionsCheckbox.checked = result.hideSuggestions;
        hideTrendsCheckbox.checked = result.hideTrends;
    });

    savePreferencesButton.addEventListener('click', function () {
        const preferences = {
            hideHeader: hideHeaderCheckbox.checked,
            hidePremium: hidePremiumCheckbox.checked,
            hideSuggestions: hideSuggestionsCheckbox.checked,
            hideTrends: hideTrendsCheckbox.checked
        };

        browser.storage.local.set(preferences, function () {
            browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                browser.tabs.sendMessage(tabs[0].id, { command: "applyPreferences" });
            });
        });
    });

    let saveButton = document.getElementById('savePreferences');
    
    saveButton.addEventListener('click', function() {
        saveButton.innerHTML = '&#10004;';
        setTimeout(function() {
            saveButton.innerHTML = 'Save changes';
        }, 3000);
    });
});
