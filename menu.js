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
    let hoursElement = document.getElementById('hours');
    const searchRE = /[0-9][0-9]*h/g;
    let num = 0;
    let next;

    console.log("Doing regex now")

    do {
        next = /[0-9]*/.exec(searchRE.exec(log));
        if(parseInt(next) > 0){
            num += parseInt(next);
            console.log(`num: ${num} next: ${next}`);
        }

    }while(parseInt(next) > 0)

    hoursElement.innerText = num + 'h';
}

window.onload=Start;