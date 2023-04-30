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
                if(text.endsWith(window.jli.cursor)) text = text.slice(0, -1);
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

        setInterval(() => {
            if(!inputText.innerText.endsWith(window.jli.cursor)) inputText.innerText += window.jli.cursor;
            else inputText.innerText = inputText.innerText.slice(0, -1);
        }, 500);

        class CommandLine {
            constructor(document){
                this.callback = (cmd) => {};
                this.requestingInput = false;
                this.cursor = "_";
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
            getInput(message=""){
                if(message != "")
                this.requestingInput = true;
                let inputPromise = new Promise((resolve, reject) => {
                    this.promiseResolve = resolve;
                });
                return inputPromise;
            }
            setCaret(character){
                if(character.length != 1) return;
                this.cursor = character;
            }
            showCursor(show){
                //document.body.style.cursor = (show ? 'default' : 'none');
                if(show){
                    document.documentElement.style.cursor = "default";
                } else {
                    document.documentElement.style.cursor = "none";
                }
            }
        }
        window.jli = new CommandLine(document);
