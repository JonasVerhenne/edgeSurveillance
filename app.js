let customHeaders = new Headers();
//customHeaders.append('Accept', 'application/json');
customHeaders.append('Content-Type', 'image/png');

const fetchData = function(url)
{
    return fetch(url, {headers: customHeaders})
        .then(r => r)
        .then(data => data);
}

const getImage = async function(name)
{
    img = new Image();
    img = await fetchData(`https://edgesurveillancefunction.azurewebsites.net/api/image/${name}`);
    showImage(img);
}

const showImage = function (image)
{
    let htmlQuestion = `<img src=${image.url}>`;
    document.getElementById("myImg").innerHTML = htmlQuestion;
}


const toggleSystem = function ()
{
    console.log("switching");
    systemStatus = !systemStatus;
    console.log(systemStatus);
}

const listenToDetection = function()
{
    console.log('click');
    newDetectionValue = detection.value
    console.log(newDetectionValue);
    if (newDetectionValue != detectionValue)
    {
        console.log('new get')
    }
    detectionValue = newDetectionValue
}

const listenToUI = function ()
{
    toggle = document.querySelector(".js-switch");
    detection = document.querySelector(".js-detection");

    toggle.addEventListener('change', toggleSystem);
    detection.addEventListener('click', listenToDetection);
}

const init = function()
{
    console.log("DOM Loaded");
    //get status from hub
    systemStatus = true;
    detectionValue = "all"
    listenToUI();
    //getImage('test2.png');
}

document.addEventListener('DOMContentLoaded', init);