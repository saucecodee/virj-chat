// import { json } from "express";
window.app = {}
window.$ =  n => document.querySelector(n);
window.$$ =  n => document.querySelectorAll(n);
window.app.chat = chat
window.app.data = JSON.parse(localStorage.getItem('data'))

const messageInput = $('.message-input')
const chatBody = $('.chat-body')



function appendMessage(username, text, date, userId) {
  let chatDiv = chat(username, text, date, userId == app.data.userId)
  chatBody.appendChild(chatDiv);
  chatDiv.scrollIntoView();
}

function appendAlert(username, type) {
  let chatDiv = alert(username, type)
  chatBody.appendChild(chatDiv);
}

function chat(username, text, dat, isCurrentUser) {
  let date = new Date()
  const div = document.createElement('div')
  div.classList.add('message', isCurrentUser ? "sent" : null)

  let message = `
    <div class="arrow"></div>
    <div class="sent-by"><h4>${username}</h4></div>
    <p> ${text} </p>
    <div class="sent-time">${date.getHours()}:${date.getMinutes()}${date.getHours() >= 12 ? 'pm' : 'am'} </div>
  `;

  div.innerHTML = message;

  return div
}

function alert(userName, type) {
  const div = document.createElement('div')
  div.classList.add('alert')
  
  let alertTypes = {}

  alertTypes.welcome = `Welcome to the group chat <b>${userName}</b>`
  alertTypes.left = `<b>${userName}</b> left the group`
  alertTypes.joined = `<b>${userName}</b> joined the group`

  div.innerHTML = alertTypes[type];

  return div
}

(function setGroupNameAndCode() {
  $("#group-name").innerHTML = app?.data?.groupName
  $("#group-code").innerHTML = app?.data?.code
})()