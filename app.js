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
    html = `<img src=${image.url}>`;
    document.getElementById("myImg").innerHTML = html;
}


const toggleSystem = function ()
{
    console.log("switching status");
    systemStatus = !systemStatus;
    console.log(systemStatus);

    /*
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "URL");
    */
    /*xhr.setRequestHeader('Content-Type', 'application/json');*/
    /*
    xhr.send();
    */
    /*
    xhr.onreadystatechange = function ()
    {
        
    }
    */
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

const imagePopUp = function(data)
{
    data = data.outerHTML; //converting object into string
    src = data.split("\"")[1];

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

    modal = document.getElementById('js-modal');
    close = document.querySelector('.close');
    close.addEventListener('click', closePopUp);

    image1 = document.querySelector(".js-image1");
    image2 = document.querySelector(".js-image2");
    image1.addEventListener('click', function() {imagePopUp(image1)});
    image2.addEventListener('click', function() {imagePopUp(image2)});
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