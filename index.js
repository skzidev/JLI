        document.write("<link rel='stylesheet' href='https://raw.githubusercontent.com/skzidev/JLI/main/terminal.css'><p id='in'></p>");
        document.close();
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
                window.cmd.callback(textElem.innerText);
                //ParseCommand(text);
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
            }
            setCommandCallback(callback){
                this.callback = callback;
            }
            showMessage(msg){
                let txt = document.createElement('p');
                txt.innerText = msg;
                document.body.insertBefore(msg, inputText);
            }
        }
        window.jli = new CommandLine(document);
