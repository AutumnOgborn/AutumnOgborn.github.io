const menuHTTP = new XMLHttpRequest();

function Start(){
    let menuURL = "/menu.txt.html";
    menuHTTP.open("GET",menuURL);
    menuHTTP.send();
    let logURL = "/Project/log.txt";
    logHTTP.open("GET",logURL);
    logHTTP.send();
}

menuHTTP.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200)
        addMenu(menuHTTP.responseText)
}

function addMenu(menuHTML){
    let menu = document.getElementById('menu-bar-location');
    const searchRE = /<!--Insert Path Here-->/;
    let menuStart = menuHTML.slice(0,searchRE.exec(menuHTML).index);
    let menuEnd = menuHTML.slice(searchRE.exec(menuHTML).index,menuHTML.length);
    let finalHTML = menuStart + makeBreadcrumb() + menuEnd;
    console.log(finalHTML);
    menu.innerHTML=finalHTML;
}
function makeBreadcrumb(){
    //let breadcrumb = document.getElementById('menu-bar-breadcrumb');
    let pathname = decodeURI(window.location.pathname);
    let slashes = [];
    let folders = [];
    let breadcrumbHTML ="";
    for(let i=0;i<pathname.length;i++)
    {
        if (pathname[i] === '/'){
            slashes.push(i);
        }
    }
    for(let i=0;i<(slashes.length-1); i++)
    {
            folders.push(pathname.slice(slashes[i]+1, slashes[i+1]));

    }
    for(let i=0;i<folders.length;i++){
        breadcrumbHTML += `<li class="breadcrumb-item"><a href="`+foldersToPath(folders,i)+ `">`+folders[i]+`</a></li>`;
    }
    return breadcrumbHTML;
}

function foldersToPath(folders, depth){
    let path = "/";
    for(let i=0;i<(depth+1);i++){
        path += folders[i] + "/";
    }
    return path;
}

const logHTTP = new XMLHttpRequest();

logHTTP.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200)
    {
        addHours(logHTTP.responseText)
    }
}

function addHours(log){
    let learnElement = document.getElementById('learn');
    let reqsElement = document.getElementById('reqs');
    let testingElement = document.getElementById('testing');
    let setupElement = document.getElementById('setup');
    let hoursElement = document.getElementById('hours');
    let hoursArray = log.split("\r\n");
    const searchRE = /[0-9][0-9]*h/g;
    let num = 0;
    let next;
    let hours = {
        learn: 0,
        reqs: 0,
        testing: 0,
        setup: 0
    }
    

    console.log("Doing regex now")
    hoursArray.forEach((line, i) => {
        let contains = {
            learn: /learn/.test(line),
            reqs: /reqs/.test(line),
            testing: /testing/.test(line),
            setup: /setup/.test(line)
        }
        let lineHours = parseInt(/[0-9]*/.exec(searchRE.exec(log)));
        num += lineHours;
        if (contains.learn){
            hours.learn += lineHours;
        }
        if (contains.reqs){
            hours.reqs += lineHours;
        }
        if (contains.testing){
            hours.testing += lineHours;
        }
        if (contains.setup){
            hours.setup += lineHours;
        }
    })
    console.log(hours);
    console.log(num);

    hoursElement.innerText = num + 'h';
    learnElement.innerText = hours.learn + 'h';
    reqsElement.innerText = hours.reqs + 'h';
    testingElement.innerText = hours.testing + 'h';
    setupElement.innerText = hours.setup + 'h';
}

window.onload=Start;