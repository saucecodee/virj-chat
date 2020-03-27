// import { json } from "express";
const $ = n => document.querySelector(n);
let messageInput = $('.message-input')
let messageForm = $('.message-form')
let messages = $('.chat-body')
let memberContainer = $('#listContainer');

let groupDetails = JSON.parse(localStorage.getItem('data'))


messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (messageInput.value.length !== 0) {
    sendMessage(messageInput.value)
    messageInput.value = ''
  }
})

function sendMessage(text) {
  let content = text;
  let d = new Date();
  let div = document.createElement('div')
  div.classList.add('message', 'sent')
  let message = `
          <div class="arrow"></div>
          <div class="sent-by"><h4>vince{}</h4></div>
          <p> ${content} </p>
          <div class="sent-time">${d.getHours()}:${d.getMinutes()}${d.getHours() >= 12 ? 'pm' : 'am'} </div>

  `;
  div.innerHTML = message;
  messages.appendChild(div);
  div.scrollIntoView();
}

function scrollToBottom() {
  messages.lastElementChild.scrollIntoView()
}

let membersList = $("#members");
let membersbtn = $(".check-members");

function showMembers() {
  membersList.style.display = "Block";
}

function hideMembers() {
  membersList.style.display = "none"
}

membersbtn.addEventListener('click', updateMembers);


function updateMembers() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://virj-chat.herokuapp.com/api/groups/5e7b52cd2b25d70017ed2557/members", requestOptions)
    .then(response => response.text())
    .then(result => {
      let output = ``;
      JSON.parse(result).data.forEach(data => {
        output += `
            <p>
              ${data.username}
            </p>
        `
      })

      memberContainer.innerHTML = output;

    })
    .catch(error => console.log('error', error));
}

$('.message-form').onsubmit = e => {
  e.preventDefault();
  if (messageInput.value.length !== 0) {
    sendMessage(messageInput.value)
    messageInput.value = ''
  }
}
