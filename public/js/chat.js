let messageInput = document.querySelector('#message')
let btnSubmit = document.querySelector('#btn-submit')
let messages = document.querySelector('#messages')
let memberContainer = document.querySelector('#listContainer');

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(messageInput.value);
  sendMessage(messageInput.value)
  messageInput.value = ''
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

let membersList = document.getElementById("members");
let membersbtn = document.getElementById("checkMembers");

function showMembers(){
    membersList.style.display = "Block";
}

function hideMembers(){
    membersList.style.display = "none"
}

membersbtn.addEventListener('click', updateMembers);


function updateMembers(){
    fetch('js/villagePeople.json')
    .then((res) => res.json())
    .then((data) => {
        let output = ``;
        data.forEach(user => {
          output += `
              <li>
                ${user.name}
              </li>
          `
        })
        
        memberContainer.innerHTML = output;
      
    })
}
