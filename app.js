let customHeaders = new Headers();
customHeaders.append('Accept', 'application/json');
// customHeaders.append('Content-Type', 'image/png');

const fetchData = function(url)
{
    return fetch(url, {headers: customHeaders})
        .then(r => r.json())
        .then(data => data);
}

// const fetchImage = function(url)
// {
//     return fetch(url, {headers: customHeaders})
//         .then(r => r)
//         .then(data => data);
// }

const getHistory = async function ()
{
    historyList = [];
    var data = await fetchData(`https://edgesurveillancefunction.azurewebsites.net/api/activity`);
    for (let i = 0; i < data.length; i++)
    {
        historyList.push(data[i]);
    }

    await showHistory(historyList)
}

const getHistoryFilter = async function (filter)
{
    historyList = [];
    var data = await fetchData(`https://edgesurveillancefunction.azurewebsites.net/api/activity/${filter}`);
    for (let i = 0; i < data.length; i++)
    {
        historyList.push(data[i]);
    }

    await showHistory(historyList)
}

const showHistory = async function (history)
{
    console.log(history)
    document.getElementById('js-history').innerHTML = "";
    for (let i = 0; i < history.length; i++)
    {
        if (history[i].person_detected)
        {
            person_detected = "person detected";
        }
        else
        {
            person_detected = "no person detected";
        }
        htmlContent = 
        `<div class='grid-container grid-body'>
            <div class="grid-time">
                ${history[i].time}
            </div>
            <div class="grid-location">
                ${history[i].location}
            </div>
            <div class="grid-detection">
                ${person_detected}
            </div>
            <div class="grid-images">
                <img src="https://edgesurveillancefunction.azurewebsites.net/api/image/${history[i].image1}" class="image js-image1">
                <img src="https://edgesurveillancefunction.azurewebsites.net/api/image/${history[i].image2}" class="image js-image2">
            </div>
        </div>`;

        document.getElementById('js-history').innerHTML += htmlContent;
    }

    htmlModal = 
    `<div class="modal" id="js-modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <div class='modal-image' id='js-popUpImage'></div>
        </div>
    </div>`;
    document.getElementById('js-history').innerHTML += htmlModal; //modal has to be at the end


    modal = document.getElementById('js-modal');
    closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', closePopUp);

    image1 = document.querySelectorAll(".js-image1");
    image2 = document.querySelectorAll(".js-image2");
    for (let i = 0; i < history.length; i++)
    {
        image1[i].addEventListener('click', function() {imagePopUp(image1[i])});
        image2[i].addEventListener('click', function() {imagePopUp(image2[i])});
    }
}


const toggleSystem = function ()
{
    console.log("switching status");
    systemStatus = !systemStatus;
    console.log(systemStatus);
}

const listenToDetection = function()
{
    newDetectionValue = detection.value;
    if (newDetectionValue != detectionValue)
    {
        if (newDetectionValue != "all")
        {
            getHistoryFilter(newDetectionValue);
        }
        else
        {
            getHistory();
        }
    }
    detectionValue = newDetectionValue;
}

const imagePopUp = function(data)
{
    data = data.outerHTML; //converting object into string
    src = data.split("\"")[1]; //getting the url to get the image

    html = `<img src=${src} class="image">`;
    document.getElementById("js-popUpImage").innerHTML = html;
    modal.style.display = 'block';
}
const closePopUp = function ()
{
    modal.style.display = "none";
}
window.onclick = function(event) //close popup when clicking next to popup
{
    if (event.target == modal)
    {
      modal.style.display = "none";
    }
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
    getHistory();
    listenToUI();
}

document.addEventListener('DOMContentLoaded', init);