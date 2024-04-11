const logHTTP = new XMLHttpRequest();

function Start(){
    let logURL = "/Project/log.txt";
    logHTTP.open("GET",logURL);
    logHTTP.send();
}
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