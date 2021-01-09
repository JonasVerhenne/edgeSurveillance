const toggleSystem = function ()
{
    console.log("switching");
    systemStatus = !systemStatus;
    console.log(systemStatus);
}

const listenToUI = function ()
{
    toggle.addEventListener('change', toggleSystem);
}

const init = function()
{
    console.log("DOM Loaded");
    toggle = document.querySelector(".js-switch");
    //get status from hub
    systemStatus = true;
    listenToUI();
}

document.addEventListener('DOMContentLoaded', init);