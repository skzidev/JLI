# JLI

JLI is a Web Framework for developing terminal web apps

## Get Started

It's simple, just paste in the script tag.

```html
<script src="bit.ly/get-jli"></script>
```

## Usage

JLI creates the `window.jli` object, which you can use to interact with it.

```javascript
window.jli.setCommandCallback((command) => {
  window.jli.showMessage(command);
});
```
