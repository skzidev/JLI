        document.write("<p id='in'></p>");
        document.close();

        document.body.style.background = "black";
        document.body.style.color = "white";
        document.body.style.fontFamily = 'Source Code Pro, monospace';

        let text = "";
        const inputText = document.getElementById('in');
        
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
            showMessage(msg){
                let txt = document.createElement('p');
                txt.innerText = msg;
                document.body.insertBefore(txt, inputText);
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
