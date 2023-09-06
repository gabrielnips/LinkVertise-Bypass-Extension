
document.addEventListener('DOMContentLoaded', function() {
    var cooldownSlider = document.getElementById('cooldownSlider');
    var cooldownValue = document.getElementById('cooldownValue');

    chrome.storage.sync.get(['cooldown'], function(result) {
        var currentCooldown = result.cooldown || 0;
        cooldownSlider.value = currentCooldown;
        cooldownValue.innerText = currentCooldown;
    });

    cooldownSlider.addEventListener('input', function() {
        var newValue = parseInt(cooldownSlider.value);
        cooldownValue.innerText = newValue;
    });

    document.getElementById('saveButton').addEventListener('click', function() {
        var newCooldown = parseInt(cooldownSlider.value);
        chrome.storage.sync.set({ cooldown: newCooldown }, function() {
            console.log("cooldown saved")
        });
    });
});
