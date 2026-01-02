// console.log(React); // confirms that React is loaded, if you've got something on console

// var h1 = document.createElement("h1");

// h1.innerText = "Hello from React CDN!";

// document.body.appendChild(h1);

// ======================

// var h1 = React.createElement("h1", null, "Hello hided from React CDN!");

// var root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(h1);


// ==========================

// var h1 = React.createElement("h1", { style: { color: "blue" } }, "Hello styled from React CDN!");
// var h2 = React.createElement("h2", { style: { color: "green" } }, "Hello h2 styled from React CDN!");

// var container = React.createElement("div", {id:'parent', style: { border: "10px solid black" }}, [h1, h2]);

// var root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(container);

// ==========================
import parent from './parent.js';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(parent());