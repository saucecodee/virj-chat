// import { json } from "express";
const $ = n => document.querySelector(n);
const messageInput = $('.message-input')
const messageForm = $('.message-form')
const chatBody = $('.chat-body')
const memberContainer = $('#listContainer');
const membersList = $("#members");
const membersbtn = $(".check-members");

let groupDetails = JSON.parse(localStorage.getItem('data'))


messageForm.addEventListener('submit', submitForm)

membersbtn.addEventListener('click', getMembers);

(function setGroupNameAndCode() {
  $("#group-name").innerHTML = groupDetails?.groupName
  $("#group-code").innerHTML = groupDetails?.groupCode
})()

function submitForm(e) {
  e.preventDefault();
  if (messageInput.value.length !== 0) {
    sendMessage(messageInput.value)
    messageInput.value = ''
  }
}

function sendMessage(text) {
  let date = new Date();
  let div = document.createElement('div')
  div.classList.add('message', 'sent')
  let message = `
          <div class="arrow"></div>
          <div class="sent-by"><h4>vince{}</h4></div>
          <p> ${text} </p>
          <div class="sent-time">${date.getHours()}:${date.getMinutes()}${date.getHours() >= 12 ? 'pm' : 'am'} </div>

  `;
  div.innerHTML = message;
  chatBody.appendChild(div);
  div.scrollIntoView();
}

function scrollToBottom() {
  chatBody.lastElementChild.scrollIntoView()
}

function showMembers() {
  membersList.style.display = "Block";
}

function hideMembers() {
  membersList.style.display = "none"
}

function getMembers() {
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
        output += `<p>${data.username}</p>`
      })

      memberContainer.innerHTML = output;

    })
    .catch(error => console.log('error', error));
}