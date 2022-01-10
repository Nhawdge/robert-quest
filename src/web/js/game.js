// var query = { room: "promptlater" };

// var socket = io("", query);

// const EVENTS = {
//   connect: "connection",
//   disconnect: "disconnect",
//   updateCharacter: "updateCharacter",
//   commitCharacter: "commitCharacter",
// };

// socket.on("update", function (data) {
//   const combat = document.querySelector("#combat");
//   const character = document.querySelector("#character");
//   const actions = document.querySelector("#actions");

//   combat.innerHTML = "";
//   character.innerHTML = "";
//   actions.innerHTML = "";
//   console.log(data);
//   data.combat.forEach((element) => {
//     var div = document.createElement("div");
//     console.log(element.components);
//     div.innerHTML = element.components.map((x) => x.data).join("<br>");
//     //var button = document.createElement("button");
//     //button.innerText = "Target";
//     div.dataset.target = element.id;
//     div.addEventListener("click", function (e) {
//       if (e.target.type == "text") {
//         e.target.addEventListener("blur", (evt) => {
//           var data = {};
//           data[evt.target.name] = e.target.value;

//           socket.emit(EVENTS.updateCharacter, data);
//         });
//       } else {
//         socket.emit(EVENTS.updateCharacter, e.target.dataset);
//       }
//     });
//     //li.appendChild(button);
//     combat.appendChild(div);
//   });

//   data.character.forEach((element) => {
//     console.log("character", element);

//     var div = document.createElement("div");
//     div.innerHTML = element.components.map((x) => x.data).join("<br>");
//     //var button = document.createElement("button");
//     //button.innerText = "Target";
//     div.dataset.target = element.id;
//     div.addEventListener("click", function (e) {
//       if (e.target.type == "text") {
//         e.target.addEventListener("blur", (evt) => {
//           var data = {};
//           data[evt.target.name] = e.target.value;

//           socket.emit(EVENTS.updateCharacter, data);
//         });
//       } else {
//         socket.emit(EVENTS.updateCharacter, e.target.dataset);
//       }
//     });
//     //li.appendChild(button);
//     character.appendChild(div);
//   });

//   data.actions.forEach((element) => {
//     var div = document.createElement("div");
//     div.innerHTML = element.components.map((x) => x.data).join("<br>");
//     //var button = document.createElement("button");
//     //button.innerText = "Target";
//     div.dataset.target = element.id;
//     div.addEventListener("click", function (e) {
//       if (e.target.type == "text") {
//         e.target.addEventListener("blur", (evt) => {
//           var data = {};
//           data[evt.target.name] = e.target.value;

//           socket.emit(EVENTS.updateCharacter, data);
//         });
//       } else {
//         socket.emit(EVENTS.updateCharacter, e.target.dataset);
//       }
//     });
//     //li.appendChild(button);
//     actions.appendChild(div);
//   });
// });

// socket.on("chat", (data) => {
//   var chatWindow = document.querySelector("#log ul");
//   var li = document.createElement("li");
//   li.innerText = data;
//   chatWindow.appendChild(li);
//   chatWindow.scroll(0, chatWindow.scrollHeight);
// });

// document.querySelector("form").addEventListener("submit", (e) => {
//   e.preventDefault();
//   var msg = e.target.querySelector('input[name="chat"]').value;
//   socket.emit("chat", msg);
//   e.target.querySelector('input[name="chat"]').value = "";
// });

// document.querySelectorAll("input").forEach((x) => {
//   x.addEventListener("blur", (e) => {
//     e.stopImmediatePropagation();

//     var updateVals = {};
//     updateVals[e.target.name] = e.target.value;
//     socket.emit("updateCharacter", updateVals);
//   });
// });

// // document.querySelectorAll("button").forEach((x) =>
// //   x.addEventListener("click", function (e) {
// //     socket.emit(EVENTS.updateCharacter, e.target.dataset);
// //   })
// // );

// document
//   .querySelector('[data-toggle="modal"]')
//   .addEventListener("click", function (e) {
//     var modalContainer = document.querySelector("#" + e.target.dataset.modal);
//     if (modalContainer) {
//       modalContainer.style.display = "none";
//     }
//   });

var canvas = document.querySelector("canvas");
canvas.width = document.querySelector("#combat").offsetWidth - 20;
canvas.height = document.querySelector("#combat").offsetHeight - 20;

import Engine from "./Engine.js";

var engine = new Engine(canvas, canvas.getContext("2d"));

engine.Start();
