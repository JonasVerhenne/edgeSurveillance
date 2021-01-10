let customHeaders = new Headers();
customHeaders.append('Accept', 'application/json');

const fetchData = function(url)
{
    return fetch(url, {headers: customHeaders})
        .then(r => r.json()) // idem aan: function(r){return r.json()}
        .then(data => data);
}

const getImage = async function(name)
{
    try
    {
        console.log(`http://localhost:7071/api/image/${name}`);
        const data = await fetchData(`http://localhost:7071/api/image/${name}`);
        //console.log(data)
        //
        showImage(data);
    }
    catch(error)
    {
        console.error('An error occured', error);
    }
}

const showImage = function (image)
{
    $('#myImg').attr('src', data);
}


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
    getImage('test.png')
}

document.addEventListener('DOMContentLoaded', init);