document.write("<p id='in'></p>");
document.close();

document.body.style.background = "black";
document.body.style.color = "white";
document.body.style.fontFamily = 'Source Code Pro, monospace';

let text = "";
const inputText = document.getElementById('in');

const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if(isMobile.any()){
    let input = document.createElement('input');
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.focus();
    input.addEventListener('keyup',(e) => {
        if(e.keyCode == 13){
            let textElem = document.createElement('p');
            textElem.innerText = e.target.value;
            document.body.insertBefore(textElem, inputText);
            if(window.jli.requestingInput){
                window.jli.promiseResolve(textElem.innerText);
                window.jli.requestingInput = false;
            }
            else {
                window.jli.callback(textElem.innerText);
            }
        }
        inputText.innerText = e.target.value;
    });
}
else {
    document.addEventListener('keyup', (e) => {
        if(e.keyCode == 8){
            text = text.slice(0, -1);
        }
        else if(e.keyCode == 13){
            if(text.endsWith("_")) text = text.slice(0, -1);
            let textElem = document.createElement('p');
            textElem.innerText = text;
            document.body.insertBefore(textElem, inputText);
            text = "";
            inputText.innerText = "";
            if(window.jli.requestingInput){
                window.jli.promiseResolve(textElem.innerText);
                window.jli.requestingInput = false;
            }
            else {
                window.jli.callback(textElem.innerText);
            }
        }
        else {
            if(e.key.length == 1) text += e.key;
        }
        inputText.innerText = text;
    });
}

setInterval(() => {
    if(!inputText.innerText.endsWith("_")) inputText.innerText += "_";
    else inputText.innerText = inputText.innerText.slice(0, -1);
}, 500);

class CommandLine {
    constructor(document){
        this.callback = (cmd) => {};
        this.requestingInput = false;
    }
    setCommandCallback(callback){
        this.callback = callback;
    }
    showMessage(msg, color="white"){
        let txt = document.createElement('p');
        txt.innerText = msg;
        txt.style.color = color;
        document.body.insertBefore(txt, inputText);
    }
    removePreviousMessage(){
        inputText.previousSibling.remove();
    }
    clearScreen(){
        document.querySelectorAll('p').forEach((item) => {
            if(item.id == 'in');
            else item.remove();
        });
    }
    getInput(){
        this.requestingInput = true;
        let inputPromise = new Promise((resolve, reject) => {
            this.promiseResolve = resolve;
        });
        return inputPromise;
    }
}
window.jli = new CommandLine(document);
