<p align="center"><img src="jli.png"></p>

<h1 align="center">JLI</h1>

<p align="center"><a href="https://jli.netlify.app">Website</a> · <a href="https://jli.netlify.app/docs">Docs</a></p>

JLI is a Web Framework for developing terminal web apps

## Get Started

It's simple, just paste in the script tag.

```html
<script src="https://cdn.jsdelivr.net/gh/skzidev/JLI/index.js"></script>
```

## Usage

JLI creates the `window.jli` object, which you can use to interact with it.

```javascript
// Run code on command execution
// This is NOT split for arguments
window.jli.setCommandCallback((command) => {
  // Execute Code
});

// Show a terminal message
window.jli.showMessage('test');

// Get input from the user (Returns promise)
window.jli.getInput().then((input) => {
  // Run code here
});

// Remove the previous 
```
