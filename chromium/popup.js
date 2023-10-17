document.addEventListener('DOMContentLoaded', function () {
    const hideTrendsCheckbox = document.getElementById('hideTrends');
    const hidePremiumCheckbox = document.getElementById('hidePremium');
    const hideHeaderCheckbox = document.getElementById('hideHeader');
    const savePreferencesButton = document.getElementById('savePreferences');

    chrome.storage.local.get(['hideTrends', 'hidePremium', 'hideHeader'], function (result) {
        hideTrendsCheckbox.checked = result.hideTrends;
        hidePremiumCheckbox.checked = result.hidePremium;
        hideHeaderCheckbox.checked = result.hideHeader;
    });

    savePreferencesButton.addEventListener('click', function () {
        const preferences = {
            hideTrends: hideTrendsCheckbox.checked,
            hidePremium: hidePremiumCheckbox.checked,
            hideHeader: hideHeaderCheckbox.checked
        };

        chrome.storage.local.set(preferences, function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { command: "applyPreferences" });
            });
        });
    });

    let saveButton = document.getElementById('savePreferences');
    
    saveButton.addEventListener('click', function() {
        saveButton.innerHTML = '&#10004;';
        setTimeout(function() {
            saveButton.innerHTML = 'Save';
        }, 3000);
    });
});
